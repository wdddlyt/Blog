from django.test import TestCase
from blog.models import Article, Category
from django.contrib.auth.models import User
import django.utils.timezone as timezone
from django.shortcuts import render,get_object_or_404,redirect
from django.urls import reverse


article = get_object_or_404(Article, pk=1)
print(reverse('blog:info', kwargs={'pk':1,'ucategory':'Hacking'}))