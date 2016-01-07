from django.core.management.base import BaseCommand
from blogapp.models import Post, Tag
import datetime

class Command(BaseCommand):
    args = '<foo bar ...>'
    help = 'our help string comes here'

    def _create_tags(self):
        tlisp = Course(
            name = "testCourse",
		    description = "testCodesc",
		    genre = "test",
		    date_created = datetime.datetime.now()
		)



    def handle(self, *args, **options):
        self._create_tags()
