from django.urls import path
from .views import ArticlesView, ArticleDetailView, PopularWeekArticlesView, ArticlePostView


urlpatterns = [
    path('', ArticlesView.as_view(), name='articles'),
    path('week/', PopularWeekArticlesView.as_view(), name='popular-articles'),
    path('create/', ArticlePostView.as_view(), name='create-post'),
    path('details/<str:slug>', ArticleDetailView.as_view(), name='article-detail'),
]
