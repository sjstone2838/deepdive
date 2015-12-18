# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0004_auto_20151119_1354'),
    ]

    operations = [
        migrations.CreateModel(
            name='OldQuestion',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('text', models.CharField(max_length=200)),
                ('answer', models.CharField(max_length=200)),
                ('lesson', models.ForeignKey(to='lessons.Lesson')),
            ],
        ),
        migrations.RenameField(
            model_name='question',
            old_name='question_text',
            new_name='text',
        ),
        migrations.RemoveField(
            model_name='content',
            name='id',
        ),
        migrations.RemoveField(
            model_name='question',
            name='lesson',
        ),
        migrations.RemoveField(
            model_name='quiz',
            name='id',
        ),
        migrations.AddField(
            model_name='question',
            name='quiz',
            field=models.ForeignKey(default=None, to='lessons.Quiz'),
        ),
        migrations.AlterField(
            model_name='content',
            name='moduleElement',
            field=models.OneToOneField(primary_key=True, serialize=False, to='lessons.ModuleElement'),
        ),
        migrations.AlterField(
            model_name='quiz',
            name='moduleElement',
            field=models.OneToOneField(primary_key=True, serialize=False, to='lessons.ModuleElement'),
        ),
    ]
