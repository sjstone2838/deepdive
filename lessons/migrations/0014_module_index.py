# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0013_question_index'),
    ]

    operations = [
        migrations.AddField(
            model_name='module',
            name='index',
            field=models.IntegerField(default=0),
        ),
    ]
