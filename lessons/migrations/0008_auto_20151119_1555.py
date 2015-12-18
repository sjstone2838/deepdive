# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0007_answerchoice'),
    ]

    operations = [
        migrations.AddField(
            model_name='moduleelement',
            name='element_type',
            field=models.CharField(default=b'Content', max_length=200, choices=[(b'Content', b'Content'), (b'Quiz', b'Quiz')]),
        ),
        migrations.AddField(
            model_name='question',
            name='question_type',
            field=models.CharField(default=b'Radio', max_length=200, choices=[(b'Radio', b'Radio'), (b'Form', b'Form')]),
        ),
    ]
