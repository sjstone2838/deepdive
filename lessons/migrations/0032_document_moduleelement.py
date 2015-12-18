# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0031_auto_20151214_1922'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='moduleElement',
            field=models.ForeignKey(default=None, to='lessons.ModuleElement'),
        ),
    ]
