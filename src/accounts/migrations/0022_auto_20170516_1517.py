# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0021_auto_20170515_2029'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='start_weight',
            field=models.FloatField(default=0.0),
        ),
        migrations.AlterField(
            model_name='user',
            name='phone_validation_key',
            field=models.IntegerField(default=250663),
        ),
    ]
