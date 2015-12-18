# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0014_module_index'),
    ]

    operations = [
        migrations.AddField(
            model_name='module',
            name='hints',
            field=models.TextField(default=b'no content text yet'),
        ),
    ]
