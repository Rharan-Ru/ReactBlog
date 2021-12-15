from django.contrib import admin
from .models import Article, Category


@admin.register(Article)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('title', 'id', 'slug', 'author',)
    prepopulated_fields = {'slug': ('title',), }

admin.site.register(Category)