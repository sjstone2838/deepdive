# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0019_auto_20151202_1820'),
    ]

    operations = [
        migrations.AddField(
            model_name='module',
            name='course',
            field=models.ForeignKey(default=1, to='lessons.Course'),
        ),
    ]
