# Rest Framewor imports
from rest_framework import generics
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

# Serializers imports
from .serializers import RegisterSerializer, UserDetailsSerializer
from articles.serializers import ArticleSerializer

# Models imports
from .models import User
from articles.models import Article


# APIView for create a new user if form is valid 
class CustomUserCreate(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        reg_serializer = RegisterSerializer(data=request.data)
        if reg_serializer.is_valid():
            new_user = reg_serializer.save(request)
            if new_user:
                return Response(status=status.HTTP_201_CREATED)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 

# Reset token and put on black list, when user is logout
class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


# Get user details view
class UserProfileView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, slug, format=None):
        try: 
            profile = User.objects.get(slug=slug)
            serializers_user = UserDetailsSerializer(profile)

            articles = Article.objects.filter(author=profile)
            serializers_article = ArticleSerializer(articles, many=True)

            return Response({'data': serializers_user.data, 'articles': serializers_article.data}, status=status.HTTP_200_OK)
        except Exception as error:
            print(error)
            return Response(status=status.HTTP_404_NOT_FOUND)


# List all users
class ListUsersView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserDetailsSerializer
