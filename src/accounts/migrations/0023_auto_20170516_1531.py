# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0022_auto_20170516_1517'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='phone_validation_key',
            field=models.IntegerField(default=249581),
        ),
    ]
