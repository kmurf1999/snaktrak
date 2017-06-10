# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.core.validators


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0009_auto_20170419_2315'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='username',
            field=models.CharField(unique=True, max_length=30, default=''),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='user',
            name='phone_number',
            field=models.CharField(unique=True, validators=[django.core.validators.RegexValidator(regex='^\\+?1?\\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")], max_length=15),
        ),
    ]
