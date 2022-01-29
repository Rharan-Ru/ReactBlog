from email.policy import default
from django.db import models
from django.utils.timezone import now
from django.utils.text import slugify
from django.conf import settings
from ckeditor.fields import RichTextField

from users.models import IpAddress
from PIL import Image
# Create your models here.


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
    slug = models.SlugField(max_length=255, unique=True, blank=True, null=True)
    content = RichTextField()
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=options, default='draft')
    published_date = models.DateTimeField(default=now)
    views = models.ManyToManyField(IpAddress, blank=True)

    objects = models.Manager() # default manager
    postobjects = PostObject() # custom manager

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.image:
            img = Image.open(self.image.path)
            if img.height > 600 or img.width > 600:
                output_size = (600, 600)
                img.image(output_size)
                img.save(self.image.path, quality=80, optmize=True)
        self.slug = slugify(self.title)
        super(Article, self).save(*args, **kwargs)

    def save_categories(title, categories):
        article = Article.objects.get(title = title)
        for categ in categories.split(','):
            category = Category.objects.get(name = categ)
            article.category.add(category)
            article.save()
