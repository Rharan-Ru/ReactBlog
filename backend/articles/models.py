from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now
from django.conf import settings
from ckeditor.fields import RichTextField

from users.models import IpAddress
# Create your models here.


class ImageTest(models.Model):
    image = models.ImageField(upload_to='project/img', blank=True, null=True)


class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Article(models.Model):
    class PostObject(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')

    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    title = models.CharField(max_length=255, unique=True)
    category = models.ManyToManyField('Category', blank=True)
    image = models.ImageField(upload_to='project/imagens', blank=True, null=True)
    slug = models.SlugField(max_length=255, unique=True)
    content = RichTextField()
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=options, default='published')
    published_date = models.DateTimeField(default=now)
    views = models.ManyToManyField(IpAddress, blank=True)

    objects = models.Manager() # default manager
    postobjects = PostObject() # custom manager
    def __str__(self):
        return self.title
