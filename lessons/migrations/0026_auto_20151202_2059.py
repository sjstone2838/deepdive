# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0025_userprofile_courses_enrolled'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='courses_managed',
            field=models.ManyToManyField(related_name='courses_managed', to='lessons.Course'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='courses_enrolled',
            field=models.ManyToManyField(related_name='courses_enrolled_in', to='lessons.Course'),
        ),
    ]
