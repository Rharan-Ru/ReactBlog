from rest_framework import status
from rest_framework.test import APIClient

from django.test import TestCase
from django.urls import reverse, resolve
from django.conf import settings

from users.serializers import RegisterSerializer
from users.models import User
from ..models import Article, Category

from ..views import (ArticlesView, PopularArticlesView, PopularWeekArticlesView,ArticlesByCategoriesView, 
ArticleDetailView, UserDetailsUpdateView, ArticlePostView, UserUpdateView)

from ..views import (AdminPageView, AdminDetailsView, AdminDeleteView, AdminUpdateView)


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
            slug = 'test',
            content = 'content',
            author = self.user,
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        
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
        url = reverse('category-articles', args=['Anime', '1'])
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

    def test_post_article_url(self):
        data = {
            'title': ['post for test'], 
            'content': ['<p>aaaaa</p>'], 
            'categories': ['Geral'], 
            'image': ['<InMemoryUploadedFile: f0afcbce7ed4a7df7b822964501bf995.jpg (image/jpeg)>']
        }
        url = reverse('create-post')
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEquals(resolve(url).func.view_class, ArticlePostView)

    def test_update_article_url(self):
        data = {
            'title': ['post for test'], 
            'content': ['<p>aaaaa</p>'], 
            'categories': ['Anime'], 
        }
        url = reverse('update-view', args=['test'])
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEquals(resolve(url).func.view_class, UserUpdateView)
        article = Article.objects.all()[0]


class TestAdminUrls(TestCase):
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
        self.user.is_superuser = True
        self.user.is_staff = True
        self.user.save()
        Category.objects.create(name="Anime")
        Article.objects.create(
            title = 'test',
            slug = 'test',
            content = 'content',
            author = self.user,
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_get_admin_articles_url(self):
        url = reverse('admin-page-view')
        response = self.client.get(url, follow=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEquals(resolve(url).func.view_class, AdminPageView)

    def test_get_admin_articles_detail_url(self):
        url = reverse('admin-article-detail', args=['test'])
        response = self.client.get(url, follow=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEquals(resolve(url).func.view_class, AdminDetailsView)

    def test_post_admin_update_article_url(self):
        data = {
            'title': ['post for test'], 
            'content': ['<p>aaaaa</p>'], 
            'categories': ['Anime'], 
        }
        url = reverse('admin-update-view', args=['test'])
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEquals(resolve(url).func.view_class, AdminUpdateView)
        article = Article.objects.all()[0]

    def test_post_admin_delete_article_url(self):
        url = reverse('admin-delete-view', args=['test'])
        response = self.client.post(url, follow=True)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEquals(resolve(url).func.view_class, AdminDeleteView)
