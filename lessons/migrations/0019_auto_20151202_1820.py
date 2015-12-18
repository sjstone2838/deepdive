# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0018_auto_20151124_1457'),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
                ('description', models.CharField(max_length=200)),
                ('genre', models.CharField(max_length=200)),
                ('managers', models.ManyToManyField(to='lessons.UserProfile')),
            ],
        ),
        migrations.AddField(
            model_name='userprofile',
            name='courses',
            field=models.ManyToManyField(to='lessons.Course'),
        ),
    ]
