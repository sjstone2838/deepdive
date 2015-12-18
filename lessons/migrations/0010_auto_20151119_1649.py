# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0009_auto_20151119_1646'),
    ]

    operations = [
        migrations.AlterField(
            model_name='content',
            name='moduleElement',
            field=models.OneToOneField(to='lessons.ModuleElement'),
        ),
        migrations.AlterField(
            model_name='quiz',
            name='moduleElement',
            field=models.OneToOneField(to='lessons.ModuleElement'),
        ),
    ]
