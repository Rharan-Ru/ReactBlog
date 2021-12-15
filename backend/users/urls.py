from django.urls import path
from .views import CustomUserCreate, BlacklistTokenUpdateView, UserProfileView, ListUsersView

app_name = 'users'

urlpatterns = [
    path('profiles/', ListUsersView.as_view(), name='users_list'),
    path('profile/<str:slug>/', UserProfileView.as_view(), name='user_profile'),
    path('register/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist')
]
