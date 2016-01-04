from django.contrib import admin
from lessons.models import *
from .models import *
from django.core import urlresolvers

"""
class CourseInline(admin.TabularInline):
	model = Module
	exclude = ['hints']
	#show_change_link=True
	extra = 1

class ManagerInline(admin.TabularInline):
	model = UserProfile
"""
class CourseAdmin(admin.ModelAdmin):
	list_display = ('name','id','description','genre','date_created')
#	inlines = [CourseInline,ManagerInline]

class ModuleInline(admin.TabularInline):
	model = ModuleElement
	show_change_link=True
	extra = 1

class ModuleAdmin(admin.ModelAdmin):
	list_display = ('name','course','id','index')
	inlines = [ModuleInline]

class QuestionInline(admin.TabularInline):
	model = Question
	list_display = ['id','text','answer','index','question_type']
	show_change_link=True
	#readonly_fields = list_display
	extra = 1

class ModuleElementAdmin(admin.ModelAdmin):
	list_display = ('name','id','index','element_type','link_to_module')
	list_filter = ['module']
	inlines = [QuestionInline]
	def link_to_module(self,obj):
		link=urlresolvers.reverse("admin:lessons_module_change", args=[obj.module.id])
		return u'<a href="%s">%s</a>' % (link,obj.module.name)
	link_to_module.allow_tags=True

class AnswerInline(admin.TabularInline):
	model = AnswerChoice
	extra = 4

class QuestionAdmin(admin.ModelAdmin):
	list_display = ('id','answer','index','question_type','link_to_module_element')
	list_filter = ['moduleElement']
	def link_to_module_element(self,obj):
		link=urlresolvers.reverse("admin:lessons_moduleelement_change", args=[obj.moduleElement.id])
		return u'<a href="%s">%s</a>' % (link,obj.moduleElement.name)
	link_to_module_element.allow_tags=True
	inlines = [AnswerInline]

class CompletionAdmin(admin.ModelAdmin):
	list_display = ('id','user','name','score','date')

class CourseStatusAdmin(admin.ModelAdmin):
	list_display = ('id','user','course','points')
	list_filter = ['user','course']

class CourseRatingAdmin(admin.ModelAdmin):
	list_display = ('id','user','course','rating')
	list_filter = ['user','course']

class UserAdmin(admin.ModelAdmin):
	#model = UserProfile
	list_display =('id','user','points','logins')
	filter_horizontal = ('courses_enrolled','courses_managed')

class DocumentAdmin(admin.ModelAdmin):
	list_display =('id','moduleElement','docfile')

class CourseLogoAdmin(admin.ModelAdmin):
	list_display =('id','course','docfile')

admin.site.register(Module,ModuleAdmin)
admin.site.register(ModuleElement,ModuleElementAdmin)
admin.site.register(Question,QuestionAdmin)
admin.site.register(UserProfile,UserAdmin)
admin.site.register(Completion,CompletionAdmin)
admin.site.register(Course,CourseAdmin)
admin.site.register(CourseStatus,CourseStatusAdmin)
admin.site.register(CourseRating,CourseRatingAdmin)
admin.site.register(Document, DocumentAdmin)
admin.site.register(CourseLogo, CourseLogoAdmin)