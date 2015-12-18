# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0033_auto_20151214_2157'),
    ]

    operations = [
        migrations.AlterField(
            model_name='document',
            name='moduleElement',
            field=models.ForeignKey(default=0, to='lessons.ModuleElement'),
        ),
    ]
