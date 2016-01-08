# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0005_auto_20160107_2057'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coursestatus',
            name='date_dropped',
            field=models.DateTimeField(null=True, blank=True),
        ),
    ]
