# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0004_module_passing_score'),
    ]

    operations = [
        migrations.AddField(
            model_name='coursestatus',
            name='date_dropped',
            field=models.DateTimeField(default=datetime.datetime(2016, 1, 1, 12, 0)),
        ),
        migrations.AddField(
            model_name='coursestatus',
            name='date_enrolled',
            field=models.DateTimeField(default=datetime.datetime(2016, 1, 1, 12, 0)),
        ),
    ]
