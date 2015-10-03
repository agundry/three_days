from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from datetime import datetime

# User managers
class UserManager(BaseUserManager):
    def create_user(self, username, first_name, last_name, email, password=None):
        user = self.model(username = username,
                          created=datetime.now(),
                          first_name=first_name,
                          last_name = last_name,
                          email = email)

        user.set_password(password)
        user.save(using=self._db)
        return user

# Create your models here.
class User(AbstractBaseUser):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=254, unique=True)
    first_name = models.CharField(max_length=30, blank=False)
    last_name = models.CharField(max_length=30, blank=False)
    email = models.EmailField(blank=False)
    created = models.DateTimeField()

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email']

class UserPreferences(models.Model):
    user = models.ForeignKey(User)
    art = models.IntegerField(default=0)
    art = models.IntegerField(default=0)
    art = models.IntegerField(default=0)
    art = models.IntegerField(default=0)
    art = models.IntegerField(default=0)
    art = models.IntegerField(default=0)


