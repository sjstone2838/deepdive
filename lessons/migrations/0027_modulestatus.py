# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0026_auto_20151202_2059'),
    ]

    operations = [
        migrations.CreateModel(
            name='ModuleStatus',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('points', models.IntegerField(default=0)),
                ('course', models.ForeignKey(to='lessons.Course')),
                ('user', models.ForeignKey(to='lessons.UserProfile')),
            ],
        ),
    ]
