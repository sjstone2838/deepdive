from django.shortcuts import render, render_to_response, get_object_or_404, redirect
from django.http import HttpResponse, HttpRequest
from django.template import loader
from django.template.context import RequestContext
from django.core.context_processors import csrf


def index(request):
	return HttpResponse("Hello world and friends")
