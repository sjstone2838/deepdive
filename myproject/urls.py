from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'myproject.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^lessons/', include('lessons.urls')),
)

urlpatterns += staticfiles_urlpatterns()

"""
urlpatterns += patterns('',
    (r'^static/', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
)
"""
