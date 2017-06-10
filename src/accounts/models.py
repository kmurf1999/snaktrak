import uuid
from datetime import timedelta
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.core.validators import RegexValidator
from random import randint

class MyUserManager(BaseUserManager):
    def _create_user(self, username, password, is_admin, is_superuser, **extra_fields):
        """
        Create and save an User with the given email, password, name and phone number.

        :param email: string
        :param password: string
        :param first_name: string
        :param last_name: string
        :param is_staff: boolean
        :param is_superuser: boolean
        :param extra_fields:
        :return: User
        """
        now = timezone.now()
        user = self.model(username=username,
                          is_admin=is_admin,
                          is_superuser=is_superuser,
                          last_login=now,
                          date_joined=now, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, username, password, **extra_fields):
        """
        Create and save an User with the given email, password and name.

        :param email: string
        :param first_name: string
        :param last_name: string
        :param password: string
        :param extra_fields:
        :return: User
        """

        return self._create_user(username, password, is_admin=False, is_superuser=False,
                                 **extra_fields)

    def create_superuser(self, username, password=None, **extra_fields):
        """
        Create a super user.

        :param email: string
        :param first_name: string
        :param last_name: string
        :param password: string
        :param extra_fields:
        :return: User
        """
        return self._create_user(username, password, is_admin=True, is_superuser=True,
                                 **extra_fields)


class User(AbstractBaseUser):
    """
    Model that represents an user.

    To be active, the user must register and confirm his email.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    username = models.CharField(max_length=30, unique=True)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '17773334444'. Up to 15 digits allowed.")
    phone_number = models.CharField(validators=[phone_regex], max_length=15, unique=True) # validators should be a list

    confirmed_phone_number = models.BooleanField(default=False);
    phone_validation_key = models.IntegerField(default=randint(100000,999999))

    is_admin = models.BooleanField(_('superuser status'), default=False)
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    date_updated = models.DateTimeField(_('date updated'), auto_now=True)
    activation_key = models.UUIDField(unique=True, default=uuid.uuid4)  # email

    target_calories = models.IntegerField(default=2000)
    target_protein = models.IntegerField(default=100)
    target_carbohydrate = models.IntegerField(default=150)
    target_fat = models.IntegerField(default=50)
    target_weight = models.FloatField(default=0.0)
    current_weight = models.FloatField(default=0.0)
    start_weight = models.FloatField(default=0.0)

    USERNAME_FIELD = 'username'

    objects = MyUserManager()

    def __str__(self):
        """
        Unicode representation for an user model.

        :return: string
        """
        return self.username

    def activation_expired(self):
        """
        Check if user's activation has expired.

        :return: boolean
        """
        return self.date_joined + timedelta(days=settings.ACCOUNT_ACTIVATION_DAYS) < timezone.now()

    def get_short_name(self):
        return self.username

    @property
    def is_superuser(self):
        return self.is_admin

    @property
    def is_staff(self):
        return self.is_admin

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return self.is_admin
