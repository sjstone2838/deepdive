# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0039_auto_20151217_1801'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='logo',
        ),
    ]
