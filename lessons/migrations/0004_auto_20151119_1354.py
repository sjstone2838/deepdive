# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0003_auto_20151118_1830'),
    ]

    operations = [
        migrations.RenameField(
            model_name='content',
            old_name='content_name',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='content',
            old_name='content_text',
            new_name='text',
        ),
        migrations.RenameField(
            model_name='module',
            old_name='module_name',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='moduleelement',
            old_name='module_element_name',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='quiz',
            old_name='quiz_name',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='quiz',
            old_name='quiz_text',
            new_name='text',
        ),
        migrations.AddField(
            model_name='moduleelement',
            name='index',
            field=models.IntegerField(default=0),
        ),
    ]
