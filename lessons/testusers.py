from django.core.management.base import BaseCommand
#from django.db import models
from lessons.models import *

class Command(BaseCommand):
    args = '<foo bar ...>'
    help = 'our help string comes here'

    def _create_tags(self):
		user = User.objects.create_user(
			username="jsmith1",
			first_name = "Joe",
			last_name = "Smith",
			email= "jsmith@smith.com",
			password= "cs50"
		)

		user_profile = UserProfile.objects.create(user = user)

	def handle(self, *args, **options):
        self._create_tags()