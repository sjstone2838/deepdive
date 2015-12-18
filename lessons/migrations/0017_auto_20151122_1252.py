# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0016_auto_20151122_1248'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='oldquestion',
            name='lesson',
        ),
        migrations.RemoveField(
            model_name='completion',
            name='lesson_name',
        ),
        migrations.AddField(
            model_name='completion',
            name='name',
            field=models.ForeignKey(default=1, to='lessons.Module'),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='Lesson',
        ),
        migrations.DeleteModel(
            name='OldQuestion',
        ),
    ]
