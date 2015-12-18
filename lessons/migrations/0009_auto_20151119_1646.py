# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0008_auto_20151119_1555'),
    ]

    operations = [
        migrations.AddField(
            model_name='content',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, default=1, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='quiz',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, default=1, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='content',
            name='moduleElement',
            field=models.OneToOneField(null=True, to='lessons.ModuleElement'),
        ),
        migrations.AlterField(
            model_name='quiz',
            name='moduleElement',
            field=models.OneToOneField(null=True, to='lessons.ModuleElement'),
        ),
    ]
