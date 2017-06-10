# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_auto_20170419_2136'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='username',
        ),
        migrations.AddField(
            model_name='user',
            name='first_name',
            field=models.CharField(max_length=50, verbose_name='First Name', default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='gender',
            field=models.CharField(max_length=1, choices=[('M', 'Male'), ('F', 'Female')], default='M'),
        ),
        migrations.AddField(
            model_name='user',
            name='last_name',
            field=models.CharField(max_length=50, verbose_name='Last Name', default=''),
            preserve_default=False,
        ),
    ]
