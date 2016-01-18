from django.conf.urls import *
from . import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings
from django.views.static import serve


urlpatterns = patterns('lessons.views',
	(r'^$', 'index'),
	# module url needs to go above course url pattern, so that it is parsed first
	(r'^/?course/(?P<course_pk>\d+)/(?P<module_index>\d+)','module'),
	(r'^/?test_result/(?P<course_pk>\d+)/(?P<module_index>\d+)','test_result'),
	(r'^/?course/(?P<course_pk>\d+)','course'),
	(r'^/?login/$','validate_user'),
	(r'^/?new_user/$','new_user'),
	(r'^/?profile/$','profile'),
	(r'^/?my_courses/$','my_courses'),
	(r'^/?create/$','create'),
	(r'^/?create_module/$','create_module'),
	(r'^/?create_course/$','create_course'),
	(r'^/?manage_enrollment/$','manage_enrollment'),
	(r'^/?edit/$','edit'),
	(r'^/?edit_data/$','edit_data'),
	(r'^/?add_media/$','add_media'),
	(r'^/?analyze/$','analyze'),
	(r'^/?course_rate/$','course_rate'),
	(r'^/?increment_logins/$','increment_logins'),
	(r'^/?search/$','search'),
	(r'^/?check_invite_code/$','check_invite_code'),
	(r'^/?email/$','email'),

	#(r'^/?list/$','list'),
	#(r'^/?demo/$','demo'),
) 
#for using bootstrap / static files, 
# per http://www.effectivedjango.com/tutorial/static.html
urlpatterns += staticfiles_urlpatterns()

urlpatterns += patterns('', 
	(r'^static/(.*)$', 'django.views.static.serve', { 'document_root': settings.STATIC_ROOT }), 
)  

if settings.DEBUG:
    urlpatterns += [
        url(r'^media/(?P<path>.*)$', serve, {
            'document_root': settings.MEDIA_ROOT,
        }),
   ]