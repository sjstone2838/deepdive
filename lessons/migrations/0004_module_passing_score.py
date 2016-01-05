# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0003_course_privacy'),
    ]

    operations = [
        migrations.AddField(
            model_name='module',
            name='passing_score',
            field=models.IntegerField(default=50),
        ),
    ]
