# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0022_auto_20151202_1851'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='courses_enrolled',
            field=models.ManyToManyField(default=1, related_name='courses_enrolled_in', to='lessons.Course'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='courses_managed',
            field=models.ManyToManyField(default=None, related_name='courses_managed', to='lessons.Course'),
        ),
    ]
