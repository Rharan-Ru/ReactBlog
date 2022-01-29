from distutils.log import info
from rest_framework_simplejwt.views import (TokenRefreshView,)
# from rest_framework.schemas import get_schema_view

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from .custom_tokens import MyTokenObtainPairView

from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static


schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      info="Mangá Brasil Blog API",
      default_version='v1',
      description="This is a API from my blog, Mangá Brasil is a personal blog that provides articles about animes, mangas and geek culture with authoral articles.",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="rharanru@gmail.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('api/', include('articles.urls')),
    path('api/users/', include('users.urls')),

    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # path('openapi', get_schema_view(title="Your Project", description="API for all things …", version="1.0.0"), name='openapi-schema'),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
