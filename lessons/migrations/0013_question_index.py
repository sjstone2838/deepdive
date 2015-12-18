# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0012_auto_20151120_1650'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='index',
            field=models.IntegerField(default=0),
        ),
    ]
