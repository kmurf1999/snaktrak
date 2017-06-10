# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0014_auto_20170425_1719'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='phone_validation_key',
            field=models.IntegerField(default=770395),
        ),
    ]
