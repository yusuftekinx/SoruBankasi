from django.shortcuts import render, redirect ,HttpResponse
from django.core import serializers
from django.http import JsonResponse
from .forms import CreateUserForm
from django.contrib.auth import authenticate, login, logout
from .models import categories, exams,topics,BlogModel,CategoryModel
import json
from .forms import *
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.contrib.auth.decorators import login_required
import random
from django.core.exceptions import ObjectDoesNotExist
from django.contrib import messages

def index(request):
    categoriess = categories.objects.all()
    examss = exams.objects.all()
    notices = Notice.objects.all()[:10]
    context = {
        'categoriess': categoriess,
        'examss': examss,
        'notices': notices
    }

    return render(request, 'index.html', context)

def IndexPageDynamicCard(request):
    if request.method == "POST":
        ReadType = request.POST.get('ExamType')
        if(ReadType == "tyt"):
            ExamTypeQuery = exams.objects.get(examname = "TYT")
            ExamTypeId = ExamTypeQuery.id
            AllSubjectData = categories.objects.filter(exams_id = ExamTypeId)
        if(ReadType == "ayt"):
            ExamTypeQuery = exams.objects.get(examname = "AYT")
            ExamTypeId = ExamTypeQuery.id
            AllSubjectData = categories.objects.filter(exams_id = ExamTypeId)
        if(ReadType == "ydt"):
            ExamTypeQuery = exams.objects.get(examname = "YDT")
            ExamTypeId = ExamTypeQuery.id
            AllSubjectData = categories.objects.filter(exams_id = ExamTypeId)
        if(ReadType == "all"):
            AllSubjectData = categories.objects.all()

        ResponseData = serializers.serialize('json', AllSubjectData)
        return JsonResponse(ResponseData,safe = False)

    return HttpResponse('')
def listele(request):
    if request.method == "POST":
        lessonid = request.POST.get('LessonId')
        examid = request.POST.get('Examid')

        query = topics.objects.filter(categories_id = lessonid,exams_id = examid)
        data = serializers.serialize('json', query)
        return JsonResponse(data,safe = False)
    return HttpResponse()

def registerPage(request):
    if request.user.is_authenticated:
                return redirect('/home/')

    else:
        if request.method == 'POST':
            msg = {}
            Username = request.POST.get('Username')
            Email = request.POST.get('Email')
            Password = request.POST.get('Password')
            PasswordConfirm = request.POST.get('PasswordConfirm')
            
            try:
                if(Password != PasswordConfirm):
                    msg['status'] = 'PasswordError'
                else:
                    user = User.objects.create_user(Username,Email,Password)
                    msg['status'] = 'success'   
            except IntegrityError:
                msg['status'] = 'UsernameError'#Aynı kullanıcı adı varsa bu hata döner



            return JsonResponse(msg,safe = False)
        return render(request, 'register.html')


def loginPage(request):
    if request.user.is_authenticated:
        return redirect('/home/')
    else:
        msg ={}
        if request.method == 'POST':
            username = request.POST.get('Username')
            password = request.POST.get('Password')

            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                msg['status'] = 'Success'

            else:
                msg['status'] = 'LoginNotSuccess'
            return JsonResponse(msg,safe = False)
    return render(request, 'login.html')

@login_required(login_url='/login/')
def logoutUser(request):
    logout(request)
    return redirect('/')

@login_required(login_url='/login/')
def home(request):

    return render(request, "AppTemplate/home.html")


@login_required(login_url='/login/')
def profile(request):
    return render(request,"AppTemplate/profile.html")

@login_required(login_url='/login/')
def addquestion(request):
    return render(request,"AppTemplate/addQuestion.html")



@login_required(login_url='/login/')
def SolveQuestion(request):
    if request.method =="POST":
        DataType = request.POST.get("type")
        if DataType == "Exam":

            ExamType = request.POST.get('ExamType')
            ExamId = request.POST.get('ExamTypeId')
            
            categorydata = categories.objects.filter(exams_id = ExamId)
            data = serializers.serialize('json', categorydata)
            return JsonResponse(data,safe =False)

        elif DataType == "lesson":
            lessonName = request.POST.get('lesson')
            lessonId = request.POST.get('lessonId')

            topicData = topics.objects.filter(categories_id=lessonId)
            data = serializers.serialize('json', topicData)
            return JsonResponse(data,safe =False)


    examsData = exams.objects.all()

    context = {
        'examdata' : examsData
    }

    return render(request,"AppTemplate/SoruCoz.html",context)


@login_required(login_url='/login/')
def testResolve(request):
    if request.method == "POST":

        # TODO: Sorular çekilecek
        context ={
            'data': sendQuestionList
        }
    return render(request,"AppTemplate/TestArayuz.html",context) 


@login_required(login_url='/login/')
def Blog(request):
    return render(request,"AppTemplate/Blog.html")

@login_required(login_url='/login/')
def AddBlog(request):
    if request.method == "POST":
        title = request.POST.get('title')
        image = request.FILES.get('image')
        content = request.POST.get('content')
        category = request.POST.get('category')
        CreateBlog = BlogModel.objects.create(BlogTitle=title,BlogContent=content,BlogAuthor=request.user.username,BlogAuthorId = request.user.id,CategoryId=category)
        messages.success(request, 'Yazı Eklendi')
    CategoryData = CategoryModel.objects.filter(CategoryAuthorId = request.user.id)
    context = {
        'CategoryData': CategoryData,
        'length': CategoryData.count()
    }
    return render(request,"AppTemplate/AddBlog.html",context)
@login_required(login_url='/login/')
def Myblog(request):
    if request.method == "POST":
        name = request.POST.get('name')
        msg = {}
        try:
            newCategory = CategoryModel.objects.create(CategoryName = name,CategoryAuthor= request.user.username,CategoryAuthorId=request.user.id)
            msg['status'] = 'success'
            msg['user'] = request.user.username
            msg['id'] = newCategory.id
            msg['name'] = newCategory.CategoryName
        except:
            msg['status'] = 'error'
        return JsonResponse(msg,safe = False)

    CategoryData = CategoryModel.objects.filter(CategoryAuthorId=request.user.id)
    context = {
        'data': CategoryData
    }
    return render(request,"AppTemplate/myblogshare.html",context)

@login_required(login_url='/login/')
def CategoryFilter(request,user,id):

    if request.method =="POST":
        CategoryId = request.POST.get('CategoryId')
        
        BlogData = BlogModel.objects.filter(CategoryId = CategoryId,BlogAuthorId=request.user.id)
        data = serializers.serialize('json', BlogData)

        return JsonResponse(data,safe = False)

    return HttpResponse('')

