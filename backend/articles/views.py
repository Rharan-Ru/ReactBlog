from django.core.paginator import Paginator
from django.utils.text import slugify
from django.utils.safestring import SafeString

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly, SAFE_METHODS, BasePermission
from rest_framework.parsers import MultiPartParser, FormParser

from .serializers import ArticleSerializer
from .models import Article, Category
from users.models import IpAddress

from datetime import timedelta
from django.utils import timezone
import bleach


# This fuction get visitor ip address to count articles views
def get_ip_address(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[-1].strip()
    else:
        ip = request.META.get('REMOTE_ADDR')
    ip = IpAddress.objects.get(ip_address=ip)
    return ip


# Permission that verify if request user is article author or not
class PostUserWritePermission(BasePermission):
    message = 'Editing posts is restricted to the author only.'
    
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.author == request.user


BLEACH_TAGS = ['a', 'abbr', 'acronym', 'b', 'blockquote', 'code', 'em', 'i', 'li', 'ol', 'strong', 'ul', 'p', 'br', 'img', 's', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
BLEACH_ATTRIBUTES = {'a': ['href', 'title'], 'abbr': ['title'], 'acronym': ['title'], 'img': ['alt', 'src', 'width', 'height'],}
BLEACH_STYLES = []
BLEACH_PROTOCOLS = ['http', 'https']


class ArticlesView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        articles = Article.objects.all().filter(status='published').order_by('-published_date')
        lasts_articles = articles[0: 4]
        lasts_serializer = ArticleSerializer(lasts_articles, many=True)
 
        todos = articles.all().count()

        paginator = Paginator(articles[4:], 8)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        serializer = ArticleSerializer(page_obj, many=True)

        return Response({'data': serializer.data, 'num_artigos': todos, 'lasts': lasts_serializer.data})


class PopularWeekArticlesView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        one_week_ago = timezone.now() - timedelta(days=7)
        week_popular_articles = Article.objects.filter(
            published_date__range=(one_week_ago, timezone.now()))
        serializer = ArticleSerializer(week_popular_articles[0:6], many=True)
        return Response(serializer.data)


class PopularArticlesView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        popular_articles = Article.objects.all().order_by('-views')
        serializer = ArticleSerializer(popular_articles[0:6], many=True)
        return Response(serializer.data)


class CategoriesView(APIView):
    def get(self, request, category, index, format=None):
        # categoria = Category.objects.get(name='Geral')
        # for x in range(30):
        #     article = Article.objects.create(
        #         title = f'teste00{x}',
        #         slug = slugify(f'teste00{x}', allow_unicode=True),
        #         content = 'teste de content',
        #         author = request.user,
        #     )
        #     article.category.add(categoria)
        #     article.save()

        index_f = (index * 5) - 5
        index_s = index * 5
        try:
            articles_by_category = Article.objects.filter(category__name=category.capitalize())[index_f:index_s]
            serializer = ArticleSerializer(articles_by_category, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as error:
            print(error)
            return Response(status=status.HTTP_404_NOT_FOUND)


class ArticleDetailView(APIView, PostUserWritePermission):
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get(self, request, slug, format=None):

        article = Article.objects.get(slug=slug)
        if not Article.objects.filter(slug=slug).exists():
            return Response(status=status.HTTP_404_NOT_FOUND)

        ip = get_ip_address(request)
        if not ip in article.views.all():
            article.views.add(ip)

        serializer = ArticleSerializer(article)
        return Response(serializer.data)


class ArticlePostView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request, format=None):
        try:
            text = request.data['content']
            content = bleach.clean(text, tags= BLEACH_TAGS, attributes= BLEACH_ATTRIBUTES, 
            styles= BLEACH_STYLES, protocols= BLEACH_PROTOCOLS,
            strip=False, 
            strip_comments=True)
            print(text)
            print(content)
            Article.objects.create(
                title = request.data['title'],
                slug = slugify(request.data['title'], allow_unicode=True),
                content = content,
                image = request.data['image'],
                author = request.user,
            )
            article=Article.objects.get(title = request.data['title'])
            for categ in request.data['categories'].split(','):
                category=Category.objects.get(name = categ)
                article.category.add(category)
                article.save()

            return Response(status = status.HTTP_200_OK)
        except Exception as erro:
            print(erro)
            return Response(status = status.HTTP_400_BAD_REQUEST)


class UserDetailsUpdateView(APIView, PostUserWritePermission):
    permission_classes = [PostUserWritePermission]
    def get(self, request, slug, format=None):
        article = Article.objects.get(slug=slug)
        if article.author != request.user:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if not Article.objects.filter(slug=slug).exists():
            return Response(status=status.HTTP_404_NOT_FOUND)

        ip = get_ip_address(request)
        if not ip in article.views.all():
            article.views.add(ip)

        serializer = ArticleSerializer(article)
        return Response(serializer.data)


class UserUpdateView(APIView, PostUserWritePermission):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [PostUserWritePermission]
    def post(self, request, slug, format=None):
        article = Article.objects.get(slug=slug)
        if article.author != request.user:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else: 
            try:
                print(request.data['categories'])
                text = request.data['content']
                content = bleach.clean(text, tags= BLEACH_TAGS, attributes= BLEACH_ATTRIBUTES, 
                styles= BLEACH_STYLES, protocols= BLEACH_PROTOCOLS,
                strip=False, 
                strip_comments=True)

                article = Article.objects.get(slug=slug)
                article.title = request.data['title']
                article.slug = slugify(request.data['title'], allow_unicode=True)
                article.content = content

                if 'media' not in request.data['image']:
                    article.image = request.data['image']

                article.category.clear()
                article.save()

                if len(request.data['categories']) > 0:
                    for categ in request.data['categories'].split(','):
                        category= Category.objects.get(name = categ)
                        article.category.add(category)
                        article.save()
                else:
                    category= Category.objects.get(name = 'Geral')
                    article.category.add(category)
                    article.save()
                return Response(status = status.HTTP_200_OK)
            except Exception as erro:
                print(erro)
                return Response(status = status.HTTP_400_BAD_REQUEST)


# Views for Admin user only
class AdminPageView(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request, format=None):
        articles = Article.objects.all()
 
        todos = articles.all().count()

        paginator = Paginator(articles, 10)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        serializer = ArticleSerializer(page_obj, many=True)

        return Response({'data': serializer.data, 'num_artigos': todos, 'super_user': request.user.is_superuser})


class AdminDetailsView(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request, slug, format=None):
        article = Article.objects.get(slug=slug)
        if not Article.objects.filter(slug=slug).exists():
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = ArticleSerializer(article)
        return Response(serializer.data)


class AdminUpdateView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAdminUser]
    def post(self, request, slug, format=None):
        try:
            text = request.data['content']
            content = bleach.clean(text, tags= BLEACH_TAGS, attributes= BLEACH_ATTRIBUTES, 
            styles= BLEACH_STYLES, protocols= BLEACH_PROTOCOLS,
            strip=False, 
            strip_comments=True)
            article = Article.objects.get(slug=slug)

            article.title = request.data['title']
            article.slug = slugify(request.data['title'], allow_unicode=True)
            article.content = content
            if 'media' not in request.data['image']:
                article.image = request.data['image']

            article.category.clear()
            article.save()

            if len(request.data['categories']) > 0:
                for categ in request.data['categories'].split(','):
                    category= Category.objects.get(name = categ)
                    if category not in article.category.all():
                        article.category.add(category)
                        article.save()
            else:
                category= Category.objects.get(name = 'General')
                article.category.add(category)
                article.save()
            return Response(status = status.HTTP_200_OK)
        except Exception as erro:
            print(erro)
            return Response(status = status.HTTP_400_BAD_REQUEST)


class AdminDeleteView(APIView):
    permission_classes = [IsAdminUser]
    def post(self, request, slug, format=None):
        article = Article.objects.get(slug=slug)
        if not Article.objects.filter(slug=slug).exists():
            return Response(status=status.HTTP_404_NOT_FOUND)

        article.delete()
        return Response(status=status.HTTP_200_OK)


class AdminPublishedView(APIView):
    permission_classes = [IsAdminUser]
    def post(self, request, slug, format=None):
        article = Article.objects.get(slug=slug)
        if not Article.objects.filter(slug=slug).exists():
            return Response(status=status.HTTP_404_NOT_FOUND)

        article.status = 'published'
        article.save()
        return Response(status=status.HTTP_200_OK)
