from django.contrib import admin
from users.models import User, IpAddress
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django import forms
from django.db import models


class UserAdminConfig(UserAdmin):
    model = User
    search_fields = ('email', 'username', 'first_name',)
    list_filter = ('email', 'username', 'first_name', 'is_active', 'is_staff')
    list_display = ('email', 'username', 'first_name',
                    'is_active', 'is_staff', 'is_superuser')
    fieldsets = (
        (None, {'fields': ('email', 'username', 'first_name', 'slug', 'image',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser')}),
        ('Personal', {'fields': ('about',)}),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows':10, 'cols': 80})},
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'slug', 'image', 'first_name', 'password1', 'password2', 'is_active', 'is_staff', 'is_superuser')}
         ),
    )
    prepopulated_fields = {'slug': ('username',), }


admin.site.register(User, UserAdminConfig)
admin.site.register(IpAddress)
# admin.site.register(Profile)
