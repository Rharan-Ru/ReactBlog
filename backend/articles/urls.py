from django.urls import path
from .views import (
ArticlesView, ArticleDetailView, 
PopularWeekArticlesView, ArticlePostView, 
PopularArticlesView, AdminPageView)


urlpatterns = [
    path('', ArticlesView.as_view(), name='articles'),
    
    path('admin/', AdminPageView.as_view(), name='admin-page-view'),

    path('week/', PopularWeekArticlesView.as_view(), name='popular-articles-week'),
    path('popular/', PopularArticlesView.as_view(), name='popular-articles'),

    path('create/', ArticlePostView.as_view(), name='create-post'),

    path('details/<str:slug>', ArticleDetailView.as_view(), name='article-detail'),
]
