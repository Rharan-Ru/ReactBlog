from django.core.paginator import Paginator
from django.utils.text import slugify
from django.utils.safestring import SafeString

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser

from .serializers import ArticleSerializer
from .models import Article, Category, ImageTest
from users.models import IpAddress

from datetime import timedelta
from django.utils import timezone


def get_ip_address(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[-1].strip()
    else:
        ip = request.META.get('REMOTE_ADDR')
    ip = IpAddress.objects.get(ip_address=ip)
    return ip


class ArticlesView(APIView):
    def get(self, request, format=None):
        articles = Article.objects.all().order_by('-published_date')
        lasts_articles = articles[0: 4]
        lasts_serializer = ArticleSerializer(lasts_articles, many=True)

        todos = articles.all().count()

        paginator = Paginator(articles[4:], 5)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        serializer = ArticleSerializer(page_obj, many=True)

        return Response({'data': serializer.data, 'num_artigos': todos, 'lasts': lasts_serializer.data})


class PopularWeekArticlesView(APIView):
    def get(self, request, format=None):
        one_week_ago = timezone.now() - timedelta(days=7)
        week_popular_articles = Article.objects.filter(published_date__range=(one_week_ago, timezone.now()))
        serializer = ArticleSerializer(week_popular_articles, many=True)
        return Response(serializer.data)


class ArticleDetailView(APIView):
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
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request, format=None):
        try:
            Article.objects.create(
                title=request.data['title'],
                slug=slugify(request.data['title'], allow_unicode=True),
                content=SafeString(request.data['content']),
                image=request.data['image'],
                author=request.user,
            )
            article = Article.objects.get(title=request.data['title'])
            for categ in request.data['categories'].split(','):
                category = Category.objects.get(name=categ)
                article.category.add(category)
                article.save()

            return Response(status=status.HTTP_200_OK)
        except Exception as erro:
            print(erro)
            return Response(status=status.HTTP_400_BAD_REQUEST)
