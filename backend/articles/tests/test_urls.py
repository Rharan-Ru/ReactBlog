from rest_framework import status

from django.test import TestCase
from django.urls import reverse, resolve
from django.conf import settings

from users.serializers import RegisterSerializer
from users.models import User
from ..models import Article, Category
from ..views import (ArticlesView, PopularArticlesView, PopularWeekArticlesView,ArticlesByCategoriesView, 
ArticleDetailView, UserDetailsUpdateView)


class TestUrls(TestCase):
    def setUp(self):
        user_register_data = {
            "email": [
                "rharanru@gmail.com"
            ],
            "username": [
                "usuario"
            ],
            "password1": [
                "senhaForte1010"
            ],
            "password2": [
                "senhaForte1010"
            ]
        }
        url = "/api/users/register/"
        self.client.post(url, user_register_data, format="json")

        self.user = User.objects.all()[0]
        Category.objects.create(name="Anime")
        Article.objects.create(
            title = 'test',
            content = 'content',
            author = self.user,
        )

    def test_get_articles_url(self):
        url = reverse('articles-view')
        response = self.client.get(url, follow=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEquals(resolve(url).func.view_class, ArticlesView)
    def test_get_popular_articles_url(self):
        url = reverse('popular-articles')
        response = self.client.get(url, follow=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEquals(resolve(url).func.view_class, PopularArticlesView)
    def test_get_popular_week_url(self):
        url = reverse('popular-articles-week')
        response = self.client.get(url, follow=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEquals(resolve(url).func.view_class, PopularWeekArticlesView)
    def test_get_articles_by_category_url(self):
        url = reverse('category-articles', args=['Anime', '0'])
        response = self.client.get(url, follow=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEquals(resolve(url).func.view_class, ArticlesByCategoriesView)
    def test_get_articles_detail_url(self):
        url = reverse('article-detail', args=['test'])
        response = self.client.get(url, follow=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEquals(resolve(url).func.view_class, ArticleDetailView)
    def test_get_articles_detail_data_url(self):
        url = reverse('details-update-view', args=['test'])
        response = self.client.get(url, follow=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEquals(resolve(url).func.view_class, UserDetailsUpdateView)
