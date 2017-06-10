# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0020_auto_20170515_1951'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='phone_validation_key',
            field=models.IntegerField(default=502249),
        ),
    ]
