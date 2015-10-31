from django.shortcuts import render, render_to_response, get_object_or_404, redirect
from django.http import HttpResponse, HttpRequest
from django.template import loader
from django.template.context import RequestContext
from django.core.context_processors import csrf

from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login,logout
from django.conf import settings
import datetime

from lessons.models import *
from .forms import *

@login_required(login_url = '/lessons/login/')
def index(request):
	lesson_list = Lesson.objects.all()
	user = request.user
	user_profile = get_object_or_404(UserProfile, user_id = user.id)
	return render_to_response('lessons/index.html', {'lesson_list':lesson_list,'user':user, 'user_profile': user_profile})

@login_required(login_url = '/lessons/login/')
def lesson(request,lesson_id):
	user = request.user
	p = get_object_or_404(Lesson, pk=lesson_id)
	dlink = "mysite/excel/" + str(p) + "_lesson.xlsx"
	print dlink
	return render_to_response('lessons/lesson.html', {'lesson': p,'user':user,'dlink':dlink})

@login_required(login_url = '/lessons/login/')	
def quiz(request, lesson_id):
	user = request.user
	p = get_object_or_404(Lesson, pk=lesson_id)
	dlink = "mysite/excel/" + str(p) + "_quiz.xlsx"
	print dlink
	return render_to_response('lessons/quiz.html', {'lesson': p,'user':user,'dlink':dlink})

@login_required(login_url = '/lessons/login/')	
def result(request, lesson_id):
	user = request.user
	lesson = get_object_or_404(Lesson, pk=lesson_id)
	questions = lesson.question_set.all()
	
	#extract answer set from Question list as list
	answers = []
	for question in questions:
		answers.append (question.answer)
	
	#Extract and order user selections by id name (e.g. answer 1, answer2,...)
	unordered_selections = request.GET
	selections = []
	for i in range(0,len(questions)):
		selections.append(unordered_selections.__getitem__('answer'+str(i+1)))
	
	feedback = []
	correct_count = 0;
	for i in range(0,len(questions)):
		if answers[i] == selections[i]:
			feedback.append("Nice, you got it right!")
			correct_count +=1
		else:
			feedback.append("Sorry, you got it wrong!")
	score = (correct_count*100) / len(questions)
	
	#increment user points by 1 if score is >50%, save to database
	if score > 50:
		user = request.user
		user_profile = get_object_or_404(UserProfile, user_id = user.id)
		user_profile.points += 1
		user_profile.save()
		
		#check if completion object already exists for this course; if not create one
		if not Completion.objects.filter(user = user_profile, lesson_name = lesson):
			completion = Completion(user = user_profile, lesson_name = lesson, score = score, date = datetime.datetime.now())
			completion.save()
	
	list = zip(questions, answers, selections,feedback)
		
	return render_to_response('lessons/result.html', {'list':list, 'score':score,'user':user})

#creates new person entry in database
def new_user(request):
	if request.method == 'GET':
		form = NewUserForm()
		method = "GET"
		return render(request, 'lessons/new_user.html', {'form': form, 'method':method})
	else:
		#create new user
		form = request.POST
		#check if username is already taken
		if len(User.objects.filter(username__iexact=form['username'])) != 0:
			error = "This username is taken. Please choose another username."
			form = NewUserForm()
			method = "GET"
			return render(request, 'lessons/new_user.html', {'form': form, 'method':method, 'error':error})
		#check if email is already taken
		elif len(User.objects.filter(email__iexact=form['email'])) != 0:
			error = "This email is taken. Please user another email."
			form = NewUserForm()
			method = "GET"
			return render(request, 'lessons/new_user.html', {'form': form, 'method':method, 'error':error})
		else:
			user = User.objects.create_user(
				username=form['username'],
				first_name = form['first_name'],
				last_name = form['last_name'],
				email=form['email'],
				password=form['password']
			)
			user_profile = UserProfile.objects.get_or_create(user = user, points = 0)
			method = "POST"
			#must call authenticate before login, even though we just created the user 
			user_login = authenticate(username=request.POST['username'], password=request.POST['password'])
			login(request,user_login)
			return render(request, 'lessons/new_user.html', {'user':user,'method':method})

#login function; redirects to log-in page and also logs-out user
def validate_user(request):
	if request.method == 'GET':
		logout(request)
		form = UserForm()
		return render(request,'lessons/login.html', {'form':form})
	else:
		username = request.POST['username']
		password = request.POST['password']
		user = authenticate(username=username, password=password)
		#if valid login
		if user is not None:
			login(request,user)
			return redirect('/lessons/')
		# if invalid login, redirect user to login page with blank UserForm
		else:
			error = "Please try a different username and password"
			form = UserForm()
			return render(request,'lessons/login.html', {'form':form,'error':error})	
		
@login_required(login_url = '/lessons/login/')
#show user profile
def profile(request):
	user = request.user
	user_profile = get_object_or_404(UserProfile, user_id = user.id)
	completions = Completion.objects.filter (user = user_profile)
	return render_to_response('lessons/profile.html', {'user':user, 'user_profile': user_profile, 'completions':completions})

"""
from django.shortcuts import render, render_to_response, get_object_or_404, redirect
from django.http import HttpResponse, HttpRequest
from django.template import loader
from django.template.context import RequestContext
from django.core.context_processors import csrf


def index(request):
	return HttpResponse("Hello world and friends")
"""
