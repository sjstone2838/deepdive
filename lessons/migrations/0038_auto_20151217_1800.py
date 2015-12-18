# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0037_course_logo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='logo',
            field=models.FileField(default=1, upload_to=b'documents/logos/%Y/%m/%d'),
        ),
    ]
