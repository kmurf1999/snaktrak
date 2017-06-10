# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('entries', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='FoodEntry',
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
        migrations.CreateModel(
            name='WeightEntry',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', primary_key=True, serialize=False)),
                ('pub_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('weight', models.FloatField()),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('pub_date',),
            },
        ),
        migrations.RemoveField(
            model_name='entry',
            name='user',
        ),
        migrations.DeleteModel(
            name='Entry',
        ),
    ]
