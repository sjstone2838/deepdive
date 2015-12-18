# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0040_remove_course_logo'),
    ]

    operations = [
        migrations.CreateModel(
            name='CourseLogo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('docfile', models.FileField(upload_to=b'documents/logos/%Y/%m/%d')),
                ('course', models.ForeignKey(default=1, to='lessons.Course')),
            ],
        ),
    ]
