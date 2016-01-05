# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0002_auto_20160102_1804'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='privacy',
            field=models.CharField(default=b'Development', max_length=200, choices=[(b'Public', b'Public'), (b'Private', b'Private'), (b'Development', b'Development')]),
        ),
    ]
