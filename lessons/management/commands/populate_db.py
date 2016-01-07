from django.core.management.base import BaseCommand
from lessons.models import *
import datetime
from sys import argv

# TO RUN: $ python manage.py createUsers [course name] [number of users to create]

class Command(BaseCommand):
	args = '<foo bar ...>'
	help = 'our help string comes here'

	def createUsers(self, *args):
		#print arg1
		print argv[2]

		user = User.objects.create(
			first_name = "John",
			last_name = "Smith",
			email = "jsmith@test.com",
			username = "jsmith6")

		userProfile = UserProfile.objects.create(
			user = user)
		
	def handle(self, *args, **options):
		self.createUsers()