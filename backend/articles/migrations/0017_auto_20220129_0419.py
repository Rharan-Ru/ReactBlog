# Generated by Django 3.2.9 on 2022-01-29 07:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0016_delete_imagetest'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='image',
            field=models.ImageField(blank=True, default='07.png', null=True, upload_to='project/imagens'),
        ),
        migrations.AlterField(
            model_name='article',
            name='slug',
            field=models.SlugField(blank=True, max_length=255, null=True, unique=True),
        ),
    ]
