# Generated by Django 3.2.9 on 2021-12-11 04:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('user', models.OneToOneField(blank=True, on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='profile', serialize=False, to='users.user')),
                ('name', models.CharField(blank=True, max_length=50, null=True)),
                ('image', models.ImageField(blank=True, default='img_profile/default.jpg', upload_to='img_profile/')),
            ],
        ),
    ]
