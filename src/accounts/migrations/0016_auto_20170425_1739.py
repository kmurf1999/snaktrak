# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0015_auto_20170425_1737'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='current_weight',
            field=models.FloatField(default=0.0),
        ),
        migrations.AddField(
            model_name='user',
            name='target_calories',
            field=models.IntegerField(default=2000),
        ),
        migrations.AddField(
            model_name='user',
            name='target_carbohydrate',
            field=models.IntegerField(default=150),
        ),
        migrations.AddField(
            model_name='user',
            name='target_fat',
            field=models.IntegerField(default=50),
        ),
        migrations.AddField(
            model_name='user',
            name='target_protein',
            field=models.IntegerField(default=100),
        ),
        migrations.AddField(
            model_name='user',
            name='target_weight',
            field=models.FloatField(default=0.0),
        ),
        migrations.AlterField(
            model_name='user',
            name='phone_validation_key',
            field=models.IntegerField(default=338897),
        ),
    ]
