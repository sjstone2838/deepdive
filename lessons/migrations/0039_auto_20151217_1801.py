# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0038_auto_20151217_1800'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='logo',
            field=models.FileField(upload_to=b'documents/logos/%Y/%m/%d'),
        ),
    ]
