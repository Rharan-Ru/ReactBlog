from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils.timezone import now
# Create your models here.

class UserManager(BaseUserManager):
    def _create_user(self, username, email, password, is_active, is_staff, is_superuser, **extra_fields):
        if not username:
            raise ValueError('This username is not valid!')
        
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, is_active=is_active, 
        is_staff=is_staff, is_superuser=is_superuser, **extra_fields)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, username, email, password, **extra_fields):
        return self._create_user(username, email, password, is_active=True, 
                                is_staff=False, is_superuser=False, **extra_fields)
    
    def create_superuser(self, username, email, password, **extra_fields):
        user = self._create_user(username, email, password,  is_active=True, 
                                is_staff=True, is_superuser=True, **extra_fields)
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    about = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    receive_newsletter = models.BooleanField(default=False)
    
    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']


class IpAddress(models.Model):
    pub_date = models.DateTimeField(default=now)
    ip_address = models. GenericIPAddressField()

    def __str__(self):
        return self.ip_address
