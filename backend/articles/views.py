from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly, SAFE_METHODS, BasePermission
from rest_framework.parsers import MultiPartParser, FormParser

from django.conf import settings
from django.core.paginator import Paginator
from django.utils.text import slugify
from django.utils.safestring import SafeString
from django.utils import timezone

from .get_ip import get_ip_address
from .permissions import PostUserWritePermission
from .serializers import ArticleSerializer
from .models import Article, Category

from datetime import timedelta
import bleach


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

        return Response({'data': serializer.data, 'num_artigos': todos, 'lasts': lasts_serializer.data}, status = status.HTTP_200_OK)


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


class ArticlesByCategoriesView(APIView):
    def get(self, request, category, index, format=None):
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
            print(request.data)
            request.data._mutable = True
            request.data['author'] = request.user
            request.data._mutable = False
            serializer = ArticleSerializer(data=request.data)
            if serializer.is_valid():
                print("valid")
                serializer.create(request.data)
            return Response(status = status.HTTP_201_CREATED)
        except Exception as erro:
            print('Temos um error', erro)
            return Response(status = status.HTTP_400_BAD_REQUEST)


# Send post details data to update data
class UserDetailsUpdateView(APIView, PostUserWritePermission):
    permission_classes = [PostUserWritePermission]
    def get(self, request, slug, format=None):
        article = Article.objects.get(slug=slug)
        if article.author != request.user:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if not Article.objects.filter(slug=slug).exists():
            return Response(status=status.HTTP_404_NOT_FOUND)

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
                article = Article.objects.get(slug=slug)
                serializer = ArticleSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.update(instance=article, validated_data=request.data)
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
            article = Article.objects.get(slug=slug)
            serializer = ArticleSerializer(data=request.data)
            if serializer.is_valid():
                serializer.update(instance=article, validated_data=request.data)
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
        return Response(status=status.HTTP_204_NO_CONTENT)


class AdminPublishedView(APIView):
    permission_classes = [IsAdminUser]
    def post(self, request, slug, format=None):
        article = Article.objects.get(slug=slug)
        if not Article.objects.filter(slug=slug).exists():
            return Response(status=status.HTTP_404_NOT_FOUND)

        article.status = 'published'
        article.save()
        return Response(status=status.HTTP_200_OK)
