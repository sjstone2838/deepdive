# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0004_auto_20151119_1354'),
    ]

    operations = [
        migrations.CreateModel(
            name='AnswerChoice',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('text', models.CharField(default=None, max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField(max_length=1000)),
                ('genre', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='CourseLogo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('docfile', models.FileField(upload_to=b'documents/logos/%Y/%m/%d')),
                ('course', models.ForeignKey(default=1, to='lessons.Course')),
            ],
        ),
        migrations.CreateModel(
            name='CourseStatus',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('points', models.IntegerField(default=0)),
                ('course', models.ForeignKey(to='lessons.Course')),
            ],
        ),
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('docfile', models.FileField(upload_to=b'documents/%Y/%m/%d')),
            ],
        ),
        migrations.RemoveField(
            model_name='content',
            name='moduleElement',
        ),
        migrations.RemoveField(
            model_name='quiz',
            name='moduleElement',
        ),
        migrations.RenameField(
            model_name='question',
            old_name='question_text',
            new_name='text',
        ),
        migrations.RemoveField(
            model_name='completion',
            name='lesson_name',
        ),
        migrations.RemoveField(
            model_name='question',
            name='lesson',
        ),
        migrations.AddField(
            model_name='completion',
            name='name',
            field=models.ForeignKey(default=1, to='lessons.Module'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='module',
            name='hints',
            field=models.TextField(default=b'no content text yet'),
        ),
        migrations.AddField(
            model_name='module',
            name='index',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='moduleelement',
            name='element_type',
            field=models.CharField(default=b'Content', max_length=200, choices=[(b'Content', b'Content'), (b'Quiz', b'Quiz'), (b'Test', b'Test')]),
        ),
        migrations.AddField(
            model_name='moduleelement',
            name='text',
            field=models.TextField(default=b'no content text yet'),
        ),
        migrations.AddField(
            model_name='question',
            name='index',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='question',
            name='moduleElement',
            field=models.ForeignKey(default=0, to='lessons.ModuleElement'),
        ),
        migrations.AddField(
            model_name='question',
            name='question_type',
            field=models.CharField(default=b'Radio', max_length=200, choices=[(b'Radio', b'Radio'), (b'Form', b'Form')]),
        ),
        migrations.AlterField(
            model_name='module',
            name='name',
            field=models.CharField(max_length=201),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='Content',
        ),
        migrations.DeleteModel(
            name='Lesson',
        ),
        migrations.DeleteModel(
            name='Quiz',
        ),
        migrations.AddField(
            model_name='document',
            name='moduleElement',
            field=models.ForeignKey(default=1, to='lessons.ModuleElement'),
        ),
        migrations.AddField(
            model_name='coursestatus',
            name='user',
            field=models.ForeignKey(to='lessons.UserProfile'),
        ),
        migrations.AddField(
            model_name='answerchoice',
            name='question',
            field=models.ForeignKey(to='lessons.Question'),
        ),
        migrations.AddField(
            model_name='module',
            name='course',
            field=models.ForeignKey(default=1, to='lessons.Course'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='courses_enrolled',
            field=models.ManyToManyField(related_name='courses_enrolled_in', to='lessons.Course'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='courses_managed',
            field=models.ManyToManyField(related_name='courses_managed', to='lessons.Course'),
        ),
    ]
