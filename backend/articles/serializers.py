from rest_framework import serializers
from .models import Article
from users.models import User
from django.utils.safestring import SafeString


class ArticleSerializer(serializers.ModelSerializer):
    views = serializers.SerializerMethodField()
    category_name = serializers.SerializerMethodField()
    author = serializers.SerializerMethodField()
    content = serializers.SerializerMethodField()
    class Meta:
        model = Article
        fields = ('id', 'title', 'image', 'slug', 'author', 'content', 'category_name', 'status', 'views', 'published_date')
        
    def get_views(self, obj):
        return obj.views.count()
    
    def get_category_name(self, obj):
        return [cate.name for cate in obj.category.all()]

    def get_author(self, obj):
        return obj.author.username
    
    def get_content(self, obj):

        return obj.content