from django.contrib import admin
from lessons.models import UserProfile
from .models import *

class ChoiceInline(admin.TabularInline):
	model = Question
	extra = 3

class LessonAdmin(admin.ModelAdmin):
	list_display = ('lesson_name','id','pub_date')
	list_filter = ['lesson_name','pub_date']
	
	fieldsets = [
		(None,               {'fields': ['lesson_name','lesson_text']}),
		('Date information', {'fields': ['pub_date'], 'classes': ['collapse']}),
	]
	inlines = [ChoiceInline]

class CompletionAdmin(admin.ModelAdmin):
	list_display = ('id','user','lesson_name','score','date')

class UserAdmin(admin.ModelAdmin):
	list_display =('id','user','points')

admin.site.register(Lesson,LessonAdmin)
admin.site.register(UserProfile,UserAdmin)
admin.site.register(Completion,CompletionAdmin)