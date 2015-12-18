# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0036_auto_20151216_2019'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='logo',
            field=models.FileField(default=None, upload_to=b'documents/logos/%Y/%m/%d'),
        ),
    ]
