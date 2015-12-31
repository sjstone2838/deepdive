# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
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
            name='Completion',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('score', models.IntegerField(default=0)),
                ('date', models.DateTimeField(verbose_name=b'date completed')),
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
        migrations.CreateModel(
            name='Module',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=201)),
                ('index', models.IntegerField(default=0)),
                ('hints', models.TextField(default=b'no content text yet')),
                ('course', models.ForeignKey(default=1, to='lessons.Course')),
            ],
        ),
        migrations.CreateModel(
            name='ModuleElement',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
                ('index', models.IntegerField(default=0)),
                ('text', models.TextField(default=b'no content text yet')),
                ('element_type', models.CharField(default=b'Content', max_length=200, choices=[(b'Content', b'Content'), (b'Quiz', b'Quiz'), (b'Test', b'Test')])),
                ('module', models.ForeignKey(to='lessons.Module')),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('text', models.CharField(max_length=200)),
                ('answer', models.CharField(max_length=200)),
                ('index', models.IntegerField(default=0)),
                ('question_type', models.CharField(default=b'Radio', max_length=200, choices=[(b'Radio', b'Radio'), (b'Form', b'Form')])),
                ('moduleElement', models.ForeignKey(default=0, to='lessons.ModuleElement')),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('points', models.IntegerField(default=0)),
                ('logins', models.IntegerField(default=0)),
                ('courses_enrolled', models.ManyToManyField(related_name='courses_enrolled_in', to='lessons.Course')),
                ('courses_managed', models.ManyToManyField(related_name='courses_managed', to='lessons.Course')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
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
            model_name='completion',
            name='name',
            field=models.ForeignKey(to='lessons.Module'),
        ),
        migrations.AddField(
            model_name='completion',
            name='user',
            field=models.ForeignKey(to='lessons.UserProfile'),
        ),
        migrations.AddField(
            model_name='answerchoice',
            name='question',
            field=models.ForeignKey(to='lessons.Question'),
        ),
    ]
