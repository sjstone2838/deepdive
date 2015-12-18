# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0002_auto_20151111_1830'),
    ]

    operations = [
        migrations.CreateModel(
            name='Content',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('content_name', models.CharField(max_length=200)),
                ('content_text', models.TextField(default=b'no content text yet')),
            ],
        ),
        migrations.CreateModel(
            name='Module',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('module_name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='ModuleElement',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('module_element_name', models.CharField(max_length=200)),
                ('module', models.ForeignKey(to='lessons.Module')),
            ],
        ),
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('quiz_name', models.CharField(max_length=200)),
                ('quiz_text', models.TextField(default=b'no quiz text yet')),
                ('moduleElement', models.OneToOneField(to='lessons.ModuleElement')),
            ],
        ),
        migrations.RemoveField(
            model_name='completion',
            name='score3',
        ),
        migrations.AddField(
            model_name='content',
            name='moduleElement',
            field=models.OneToOneField(to='lessons.ModuleElement'),
        ),
    ]
