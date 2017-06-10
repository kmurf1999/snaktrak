# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('entries', '0003_auto_20170515_2029'),
    ]

    operations = [
        migrations.AlterField(
            model_name='weightentry',
            name='user',
            field=models.ForeignKey(related_name='weight_entries', to=settings.AUTH_USER_MODEL),
        ),
    ]
