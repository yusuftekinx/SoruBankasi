from django.db import models
from ckeditor.fields import RichTextField
from django.contrib.auth.models import User

class exams(models.Model):
    examname = models.CharField(max_length=100, verbose_name='Sınav Adı')
    description = models.TextField()

    def __str__(self):
        return self.examname


class categories(models.Model):
    ders = models.CharField(max_length=100, verbose_name='Ders Adı')
    image = models.ImageField(upload_to="categoriesuploads/%Y/%m/%d", default="defaultphoto.jpg",
                              null=True,blank = True)
    exams = models.ForeignKey(exams, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.ders


class topics(models.Model):
    topicname = models.CharField(max_length=150, null=True, verbose_name='Ders Başlığı Adı')
    image = models.ImageField(upload_to="topicsuploads/%Y/%m/%d", null=True)
    exams = models.ForeignKey(exams, null=True, on_delete=models.DO_NOTHING)
    categories = models.ForeignKey(categories, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.topicname


class questions(models.Model):
    SoruGorseli = models.ImageField(upload_to="questions-soruuploads/%Y/%m/%d", blank = True,null=True)
    SoruMetni = RichTextField()
    A = models.CharField(max_length=250)
    B = models.CharField(max_length=250)
    C = models.CharField(max_length=250)
    D = models.CharField(max_length=250)
    E = models.CharField(max_length=250)
    IdealCozumSuresi = models.SmallIntegerField()
    DogruCevap = models.CharField(max_length=250)
    CozumGorseli = models.ImageField(upload_to='questions-cozumuploads/%Y/%m/%d', blank=True,null = True)

    exams = models.ForeignKey(exams, on_delete=models.DO_NOTHING)
    categories = models.ForeignKey(categories, on_delete=models.DO_NOTHING)
    topics = models.ForeignKey(topics, on_delete=models.DO_NOTHING)
    author = models.ForeignKey('auth.user', on_delete=models.DO_NOTHING)
    authorId = models.IntegerField(null = True)

    def __str__(self):
        return self.SoruMetni




class Notice(models.Model):
    NoticeTitle = models.CharField(max_length=50)
    NoticeContent = models.TextField()
    NoticeDate = models.DateTimeField(auto_now_add=True)

    NoticeAuthor = models.CharField(max_length=50)
    NoticeAuthorId = models.IntegerField()

    def __str__(self):
        return self.NoticeTitle


class BlogModel(models.Model):

    BlogTitle = models.CharField(max_length=60)
    BlogContent = models.TextField()
    BlogCreatedDate = models.DateTimeField(auto_now_add=True)

    BlogAuthor = models.CharField(max_length=60,null =True)
    BlogAuthorId = models.IntegerField(null=True)

    CategoryId = models.IntegerField(null=True)



class CategoryModel (models.Model):
    CategoryName = models.CharField(max_length=10,null = True)
    CategoryAuthor = models.CharField(max_length=30,null = True)
    CategoryAuthorId = models.IntegerField(null = True)
    CategoryCreatedDate = models.DateTimeField(auto_now_add=True)

