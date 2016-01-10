from django.core.management.base import BaseCommand
from lessons.models import *
from sys import argv
import datetime
from datetime import timedelta
from random import randint

class Command(BaseCommand):
	args = '<foo bar ...>'
	#unclear what needs to be in args , but this works - "foo bar" is not passed as an arg anywhere
	help = 'This script will populate a course: it will take a given course and number of users and allocate an equal number of users to each module. TO RUN: $ python manage.py populate_course [course name] [number of users to create]'

	def populate_course(self, *args):
		course = Course.objects.get(name = argv[2])
		modules = Module.objects.filter(course = course)
		# add 1 to module count so that some users have passed no modules, some have passed entire course
		module_count = modules.count() + 1

		user_count = int(argv[3])
		module_count_low = int(user_count / module_count)
		user_count_array = []
		for i in range(0, module_count):
			if i < module_count - 1:
				user_count_array.append(module_count_low)
			else:
				user_count_array.append(user_count - ((module_count-1) * module_count_low))

		user_index = 1
		user = {}
		userProfile = {}

		for i in range(0,module_count):
			# create users, CourseStatus, Completions, and Ratings for users advancing only to module i 
			for j in range(0, user_count_array[i]):
				#if test user does not already exist, create
				userProfile = ""
				if User.objects.filter(last_name = "Smith " + str(user_index)).count() == 0:
					user = User.objects.create(
						first_name = "John",
						last_name = "Smith " + str(user_index),
						email = "jsmith@test.com",
						username = "jsmith" + str(user_index)
					)

					userProfile = UserProfile.objects.create(
						user = user,
					)
				else:
					user = User.objects.get(last_name = "Smith " + str(user_index))
					userProfile = UserProfile.objects.get(user = user)

				if i == (module_count - 1):
					CourseRating.objects.create(
						user = userProfile,
						course = course,
						rating = randint(0,5)
					)

				userProfile.courses_enrolled.add(course)

				#if test CourseStatus does not already exist, create
				# date assignment requires one week for each module
				completion_time_per_module = randint(10,30)
				if CourseStatus.objects.filter(user = userProfile, course = course) != 0:
					courseStatus = CourseStatus.objects.create(
						course = course,
						user = userProfile,
						points = i,
						date_enrolled = datetime.datetime.now() - timedelta(days = completion_time_per_module) * (module_count)
						)

				#populate completions
				for k in range(0,i):
					Completion.objects.create(
						user = userProfile,
						name = Module.objects.get(course = course, index = k + 1),
						score = randint(0,9) * 3 + 70,
						date = datetime.datetime.now() - timedelta(days = completion_time_per_module) * (i - k)
					)
				
				user_index += 1

	def handle(self, *args, **options):
		self.populate_course()