from django import forms
from lessons.models import *
from django.contrib.auth.models import User
from django.contrib.admin.widgets import FilteredSelectMultiple
from django.forms import ModelForm
from lessons.models import *

class PostForm(forms.Form):
    content = forms.CharField(max_length=256)
    created_at = forms.DateTimeField()

class PersonForm(forms.Form):
	first_name = forms.CharField(max_length=256)
	last_name = forms.CharField(max_length=256)
	age = forms.IntegerField()

class UserForm(forms.Form):
	username = forms.CharField(max_length=256)
	password = forms.CharField(widget=forms.PasswordInput())

class UserProfileForm(forms.ModelForm):
	class Meta:
		model = UserProfile
		fields = ('points',)

class NewUserForm(forms.Form):
	username = forms.CharField(max_length=256)
	first_name = forms.CharField(max_length=256)
	last_name = forms.CharField(max_length=256)
	email = forms.EmailField(max_length=256)
	password = forms.CharField(widget=forms.PasswordInput())
	password_confirmation = forms.CharField(widget=forms.PasswordInput())

class ModuleForm(ModelForm):
	class Meta:
		model = Module
		fields = ['name','hints']

class ModuleElementForm(forms.Form):
	module = forms.ModelChoiceField(queryset=Module.objects.all())
	name = forms.CharField(max_length=200)
	text = forms.CharField(widget=forms.Textarea)
	element_type = forms.ChoiceField(choices=ELEMENT_TYPE_CHOICES,label="Type")

class AddModuleElementForm(forms.Form):
	name = forms.CharField(max_length=200)
	text = forms.CharField(widget=forms.Textarea)
	element_type = forms.ChoiceField(choices=ELEMENT_TYPE_CHOICES,label="Type")

class QuestionForm(forms.Form):
	moduleElement = forms.ModelChoiceField(queryset=ModuleElement.objects.all(),label="Module Element")
	text = forms.CharField(widget=forms.Textarea)
	answer = forms.CharField(max_length=200)
	question_type = forms.ChoiceField(choices=QUESTION_TYPE_CHOICES,label="Type")

class AnswerChoiceForm(forms.Form):
	question = forms.ModelChoiceField(queryset=Question.objects.all(), widget=forms.Select(attrs={'style': 'width:200px'}))
	text = forms.CharField(max_length=200)

	"""
	"""
	
class DocumentForm(forms.Form):
    moduleElement = forms.ModelChoiceField (queryset = ModuleElement.objects.all(), label = "Select a ModuleElement")
    docfile = forms.FileField(
        label='Select a file'
    )

class CourseLogoForm(forms.Form):
    course = forms.ModelChoiceField (queryset = Course.objects.all(), label = "Select a Course")
    docfile = forms.FileField(
        label='Select a file'
    )
