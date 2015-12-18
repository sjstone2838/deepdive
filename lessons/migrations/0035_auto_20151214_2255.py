# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0034_auto_20151214_2158'),
    ]

    operations = [
        migrations.AlterField(
            model_name='document',
            name='moduleElement',
            field=models.ForeignKey(default=1, to='lessons.ModuleElement'),
        ),
    ]
