# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0011_auto_20151119_1651'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='content',
            name='moduleElement',
        ),
        migrations.RemoveField(
            model_name='quiz',
            name='moduleElement',
        ),
        migrations.RemoveField(
            model_name='question',
            name='quiz',
        ),
        migrations.AddField(
            model_name='moduleelement',
            name='text',
            field=models.TextField(default=b'no content text yet'),
        ),
        migrations.AddField(
            model_name='question',
            name='moduleElement',
            field=models.ForeignKey(default=0, to='lessons.ModuleElement'),
        ),
        migrations.DeleteModel(
            name='Content',
        ),
        migrations.DeleteModel(
            name='Quiz',
        ),
    ]
