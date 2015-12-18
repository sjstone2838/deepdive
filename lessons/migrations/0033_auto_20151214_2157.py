# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0032_document_moduleelement'),
    ]

    operations = [
        migrations.AlterField(
            model_name='document',
            name='moduleElement',
            field=models.ForeignKey(to='lessons.ModuleElement'),
        ),
    ]
