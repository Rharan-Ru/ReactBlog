from django.urls import path
from .views import (
AdminDeleteView, AdminDetailsView, ArticlesView, 
ArticleDetailView, CategoriesView, PopularWeekArticlesView, 
ArticlePostView, PopularArticlesView, 
AdminPageView, AdminUpdateView,
AdminDeleteView, AdminPublishedView,
CategoriesView, UserUpdateView,
UserDetailsUpdateView)


urlpatterns = [
    path('', ArticlesView.as_view(), name='articles'),
    
    path('admin/', AdminPageView.as_view(), name='admin-page-view'),
    path('admin/published/<str:slug>', AdminPublishedView.as_view(), name='admin-published-view'),
    path('admin/delete/<str:slug>', AdminDeleteView.as_view(), name='admin-delete-view'),
    path('admin/update/<str:slug>', AdminUpdateView.as_view(), name='admin-update-view'),
    path('admin-details/<str:slug>', AdminDetailsView.as_view(), name='admin-article-detail'),

    path('week/', PopularWeekArticlesView.as_view(), name='popular-articles-week'),
    path('popular/', PopularArticlesView.as_view(), name='popular-articles'),
    path('category/<str:category>/<int:index>', CategoriesView.as_view(), name='category-articles'),

    path('create/', ArticlePostView.as_view(), name='create-post'),
    path('update/<str:slug>', UserUpdateView.as_view(), name='update-view'),
    path('details/update/<str:slug>', UserDetailsUpdateView.as_view(), name='details-update-view'),


    path('details/<str:slug>', ArticleDetailView.as_view(), name='article-detail'),
]
