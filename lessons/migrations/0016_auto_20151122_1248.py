# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0015_module_hints'),
    ]

    operations = [
        migrations.AlterField(
            model_name='moduleelement',
            name='element_type',
            field=models.CharField(default=b'Content', max_length=200, choices=[(b'Content', b'Content'), (b'Quiz', b'Quiz'), (b'Test', b'Test')]),
        ),
    ]
