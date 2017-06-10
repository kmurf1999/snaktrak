# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.core.validators


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0012_auto_20170420_0001'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='confirmed_phone_number',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='phone_validation_key',
            field=models.IntegerField(default=185984),
        ),
        migrations.AlterField(
            model_name='user',
            name='phone_number',
            field=models.CharField(max_length=15, unique=True, validators=[django.core.validators.RegexValidator(message="Phone number must be entered in the format: '7773334444'. Up to 15 digits allowed.", regex='^\\+?1?\\d{9,15}$')]),
        ),
    ]
