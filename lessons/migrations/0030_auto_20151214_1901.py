# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0029_media'),
    ]

    operations = [
        migrations.AlterField(
            model_name='media',
            name='upload',
            field=models.FileField(upload_to=b'uploads/'),
        ),
    ]
