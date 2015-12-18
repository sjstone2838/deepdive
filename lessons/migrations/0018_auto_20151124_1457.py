# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0017_auto_20151122_1252'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answerchoice',
            name='text',
            field=models.CharField(default=None, max_length=200),
        ),
    ]
