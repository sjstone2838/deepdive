from django.conf.urls import *
from . import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


urlpatterns = patterns('lessons.views',
	(r'^$', 'index'),
)

