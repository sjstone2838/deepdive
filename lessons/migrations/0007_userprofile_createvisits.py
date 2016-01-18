# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0006_auto_20160107_2137'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='createvisits',
            field=models.IntegerField(default=0),
        ),
    ]
