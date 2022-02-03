from tkinter import ARC
from rest_framework import status
from rest_framework.test import APIClient

from django.test import TestCase
from django.urls import reverse, resolve
from django.conf import settings
from django.utils import timezone
from django.utils.text import slugify

from datetime import timedelta

from users.serializers import RegisterSerializer
from users.models import User
from ..models import Article, Category

from ..views import (ArticlesView, PopularArticlesView, PopularWeekArticlesView,ArticlesByCategoriesView, 
ArticleDetailView, UserDetailsUpdateView, ArticlePostView, UserUpdateView)

from ..views import (AdminPageView, AdminDetailsView, AdminDeleteView, AdminUpdateView)


class TestViews(TestCase):
    def setUp(self):
        user1 = {"email": ["rharanru@gmail.com"], "username": ["usuario1"], "password1": ["senhaForte1010"], 
        "password2": ["senhaForte1010"]}
        user2 = {"email": ["rharan@gmail.com"], "username": ["usuario2"], "password1": ["senhaForte1010"], 
        "password2": ["senhaForte1010"]}

        url = "/api/users/register/"
        self.client.post(url, user1, format="json")
        self.client.post(url, user2, format="json")
        
        self.user1 = User.objects.get(username="usuario1")
        self.user2 = User.objects.get(username="usuario2")

        self.anime_category = Category.objects.create(name="Anime")

        # Creating 5 articles for each user
        for x in range(5):
            articles1 = Article.objects.create(title = f'{self.user1.username} test{x}', 
            content = 'content', author = self.user1, status='published')
            articles2 = Article.objects.create(title = f'{self.user2.username} test{x + 5}', 
            content = 'content', author = self.user2, status='published',)

            articles1.category.add(self.anime_category)
            articles2.category.add(self.anime_category)
            articles1.save()
            articles2.save()

        self.client1 = APIClient()
        self.client2 = APIClient()

        self.client1.force_authenticate(user=self.user1)
        self.client2.force_authenticate(user=self.user2)
        
    def test_get_articles_data_view(self):
        url = reverse('articles-view')
        response = self.client1.get(url, follow=True)
        self.assertEquals(len(response.data['data']), 6)
        self.assertEquals(response.data['num_artigos'], 10)
        self.assertEquals(len(response.data['lasts']), 4)
    
    def test_get_articles_popular_data_view(self):
        url = reverse('popular-articles')
        response = self.client1.get(url, follow=True)
        self.assertEquals(len(response.data), 6)

    def test_get_articles_week_data_view(self):
        one_week_ago = timezone.now() - timedelta(days=7)
        week_popular_articles = Article.objects.filter(
            published_date__range=(one_week_ago, timezone.now()))

        url = reverse('popular-articles-week')
        response = self.client1.get(url, follow=True)
        self.assertEquals(len(response.data), 6)
        self.assertEquals(response.data[0]['id'], week_popular_articles[0].id)
    
    def test_get_articles_by_category_data_view(self):
        url = reverse('category-articles', args=['Anime', '1'])
        response = self.client1.get(url, follow=True)
        self.assertEquals(len(response.data), 5)
    
    def test_get_articles_detail_data_view(self):
        url1 = reverse('article-detail', args=['usuario1-test0'])
        url2 = reverse('article-detail', args=['usuario1-test0'])
        response1 = self.client1.get(url1, follow=True)
        self.assertEquals(response1.data['title'], 'usuario1 test0')
        self.assertEquals(response1.data['slug'], 'usuario1-test0')
        self.assertEquals(response1.data['author'], 'usuario1')
        self.assertEquals(response1.data['content'], 'content')
        self.assertEquals(response1.data['views'], 1)
    
    def test_post_article_data_view(self):
        data = {'title': ['testezin'], 'content': ['<p>aaa</p>'], 'categories': ['Anime']}
        
        url = reverse('create-post')
        response = self.client1.post(url, data)
        article = Article.objects.get(title='testezin')
        self.assertEquals(article.title, 'testezin')
        self.assertEquals(article.slug, slugify('testezin'))
        self.assertEquals(article.author, self.user1)
        self.assertIn('aaa', article.content)
