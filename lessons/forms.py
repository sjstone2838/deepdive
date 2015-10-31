from django import forms
from lessons.models import UserProfile
from django.contrib.auth.models import User

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
	