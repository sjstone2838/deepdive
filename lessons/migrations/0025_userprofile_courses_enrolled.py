# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0024_auto_20151202_2010'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='courses_enrolled',
            field=models.ManyToManyField(to='lessons.Course'),
        ),
    ]
