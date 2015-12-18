# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0027_modulestatus'),
    ]

    operations = [
        migrations.CreateModel(
            name='CourseStatus',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('points', models.IntegerField(default=0)),
                ('course', models.ForeignKey(to='lessons.Course')),
                ('user', models.ForeignKey(to='lessons.UserProfile')),
            ],
        ),
        migrations.RemoveField(
            model_name='modulestatus',
            name='course',
        ),
        migrations.RemoveField(
            model_name='modulestatus',
            name='user',
        ),
        migrations.DeleteModel(
            name='ModuleStatus',
        ),
    ]
