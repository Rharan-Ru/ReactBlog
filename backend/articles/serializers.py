from rest_framework import serializers
from .models import Article, ImageTest


class ArticleSerializer(serializers.ModelSerializer):
    views = serializers.SerializerMethodField()
    category_name = serializers.SerializerMethodField()
    class Meta:
        model = Article
        fields = ('id', 'title', 'image', 'slug', 'author', 'content', 'category_name', 'views', 'published_date')
        
    def get_views(self, obj):
        return obj.views.count()
    
    def get_category_name(self, obj):
        return [cate.name for cate in obj.category.all()]
