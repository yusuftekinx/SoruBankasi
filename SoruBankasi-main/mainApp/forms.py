from django import forms
from .models import *
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from ckeditor.widgets import CKEditorWidget


class examform(forms.ModelForm):
    class Meta:
        model = exams
        fields = '__all__'


class categoiesform(forms.ModelForm):
    class Meta:
        model = categories
        fields = '__all__'


class topicsform(forms.ModelForm):
    class Meta:
        model = topics
        fields = '__all__'


class CreateUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
