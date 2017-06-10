# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Entry',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', primary_key=True, serialize=False)),
                ('pub_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('total_carbohydrate', models.FloatField()),
                ('serving_unit', models.CharField(max_length=40)),
                ('total_protein', models.FloatField()),
                ('total_calories', models.FloatField()),
                ('total_fat', models.FloatField()),
                ('serving_qty', models.IntegerField()),
                ('food_name', models.CharField(max_length=40)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('pub_date',),
            },
        ),
    ]
