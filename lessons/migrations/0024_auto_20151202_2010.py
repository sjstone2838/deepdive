# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0023_auto_20151202_1854'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='courses_enrolled',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='courses_managed',
        ),
    ]
