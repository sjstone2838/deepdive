# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0021_auto_20151202_1838'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='managers',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='courses',
        ),
        migrations.AddField(
            model_name='userprofile',
            name='courses_enrolled',
            field=models.ManyToManyField(related_name='courses_enrolled_in', to='lessons.Course'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='courses_managed',
            field=models.ManyToManyField(related_name='courses_managed', to='lessons.Course'),
        ),
    ]
