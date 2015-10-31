from django.db import models
from django.contrib.auth.models import User

class Lesson(models.Model):
	lesson_name = models.CharField(max_length=200)
	lesson_text = models.TextField(default="no lesson text")
	pub_date = models.DateTimeField('date published')
	
	def __unicode__(self):
		return self.lesson_name
	
class Question(models.Model):
	lesson = models.ForeignKey(Lesson)
	question_text = models.CharField(max_length=200)
	answer = models.CharField(max_length=200)
	
	def __unicode__(self):
		return self.question_text
		
class UserProfile(models.Model):
	user = models.ForeignKey(User,unique=True)
	points = models.IntegerField(default=0)
	
	def __unicode__(self):
		return self.user.username
		
class Completion(models.Model):
	user = models.ForeignKey(UserProfile)
	lesson_name = models.ForeignKey(Lesson)
	score = models.IntegerField(default=0)
	score3 = models.IntegerField(default=1)
	date = models.DateTimeField('date completed')
	
	def __unicode__(self):
		return str(self.lesson_name)
	