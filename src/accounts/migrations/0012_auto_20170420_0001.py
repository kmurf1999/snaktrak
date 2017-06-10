# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0011_auto_20170419_2336'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='confirmed_email',
        ),
        migrations.RemoveField(
            model_name='user',
            name='email',
        ),
    ]
