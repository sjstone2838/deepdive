from django.db import models
from django.contrib.auth.models import User

class Course(models.Model):
	name = models.CharField(max_length=200)
	description = models.TextField(max_length=1000)
	genre = models.CharField(max_length=200)

	def __unicode__(self):
		return self.name

class Module(models.Model):
	name = models.CharField(max_length=201)
	course = models.ForeignKey(Course, default = 1)
	index = models.IntegerField(default=0)
	hints = models.TextField(default="no content text yet")

	def __unicode__(self):
		return self.name

ELEMENT_TYPE_CHOICES = (
	('Content','Content'),
	('Quiz','Quiz'),
	('Test','Test')
)

class ModuleElement(models.Model):
	module = models.ForeignKey(Module)
	name = models.CharField(max_length=200)
	index = models.IntegerField(default=0)
	text = models.TextField(default="no content text yet")
	element_type = models.CharField(max_length=200,
		choices=ELEMENT_TYPE_CHOICES,
		default='Content'
	)

	def __unicode__(self):
		return self.name

QUESTION_TYPE_CHOICES = (
	('Radio','Radio'),
	('Form','Form')
)
class Question(models.Model):
	moduleElement = models.ForeignKey(ModuleElement,default=0)
	text = models.CharField(max_length=200)
	answer = models.CharField(max_length=200)
	index = models.IntegerField(default=0)
	question_type = models.CharField(max_length=200,
		choices=QUESTION_TYPE_CHOICES,
		default='Radio'
	)

	def __unicode__(self):
		return self.text

class AnswerChoice(models.Model):
	question = models.ForeignKey(Question)
	text = models.CharField(max_length=200, default = None)
	
	def __unicode__(self):
		return self.text

class UserProfile(models.Model):
	user = models.ForeignKey(User)
	# Should get ride of points, as it is replicated in ModuleStatus
	points = models.IntegerField(default=0)
	courses_enrolled = models.ManyToManyField(Course, related_name='courses_enrolled_in')
	courses_managed = models.ManyToManyField(Course, related_name='courses_managed')
	
	def __unicode__(self):
		return self.user.username
		
class Completion(models.Model):
	user = models.ForeignKey(UserProfile)
	name = models.ForeignKey(Module)
	score = models.IntegerField(default=0)
	date = models.DateTimeField('date completed')
	
	def __unicode__(self):
		return str(self.name)

class CourseStatus(models.Model):
	user = models.ForeignKey(UserProfile)
	course = models.ForeignKey(Course)
	points = models.IntegerField(default=0)
	
	def __unicode__(self):
		return str(self.user) + "_" + str(self.course)

class Document(models.Model):
    moduleElement = models.ForeignKey(ModuleElement, default = 1)
    docfile = models.FileField(upload_to='documents/%Y/%m/%d')

    def __unicode__(self):
		return str(self.docfile)

class CourseLogo(models.Model):
    course = models.ForeignKey(Course, default = 1)
    docfile = models.FileField(upload_to='documents/logos/%Y/%m/%d')

    def __unicode__(self):
		return str(self.docfile)  
"""
"""
