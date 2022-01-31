from rest_framework import serializers
from .models import Article
from users.models import User
from django.utils.safestring import SafeString
from django.utils.text import slugify
from django.conf import settings
import bleach


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

    def create(self, validated_data):
        title = validated_data['title']
        content = validated_data['content']
        image = validated_data['image']
        author = validated_data['author']
        categories = validated_data['categories']
        content = bleach.clean(content, tags= settings.BLEACH_TAGS, attributes= settings.BLEACH_ATTRIBUTES, 
        styles= settings.BLEACH_STYLES, protocols= settings.BLEACH_PROTOCOLS, strip=False, strip_comments=True)
        article = Article.objects.create(
            title = title,
            content = content,
            image = image,
            slug = slugify(title),
            author = author,
        )
        Article.save_categories(title=title, categories=categories)
        return article

    def update(self, instance, validated_data):
        print("instance: ", instance)
        print("validated_data: ", validated_data)
        print(validated_data['title'])
        content = bleach.clean(validated_data['content'], tags= settings.BLEACH_TAGS, attributes= settings.BLEACH_ATTRIBUTES, 
        styles= settings.BLEACH_STYLES, protocols= settings.BLEACH_PROTOCOLS, strip=False, strip_comments=True)

        instance.title = validated_data.get('title', instance.title)
        instance.image = validated_data.get('image', instance.image)
        instance.slug = slugify(validated_data.get('title', instance.title))
        instance.content = validated_data.get('content', content)

        instance.category.clear()
        instance.save()
        Article.save_categories(title=validated_data['title'], categories=validated_data['categories'])
        return instance
