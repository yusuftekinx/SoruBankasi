from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('listele/',views.listele,name = "listele"),
    path('register/', views.registerPage, name="register"),
    path('login/', views.loginPage, name="login"),
    path('logout/', views.logoutUser, name="logout"),
    path('home/', views.home, name="home"),
    path('indexCardEvent/',views.IndexPageDynamicCard,name = "IndexCardEvent"),
    path('profile/',views.profile,name = "profile"),
    path('addquestion/',views.addquestion,name = "addQuestion"),
    path('solveQuestion/',views.SolveQuestion,name = "solveQuestion"),
    path('testResolve/',views.testResolve,name = "testResolve"),
    path('blogs/',views.Blog,name = "Blog"),
    path('AddBlog/',views.AddBlog,name = "AddBlog"),
    path('myblog/',views.Myblog,name = "MyBlog"),
    path('myblog/<user>/<id>/',views.CategoryFilter),
    path('calendar/', views.calendar, name="calendar"),

    










]
