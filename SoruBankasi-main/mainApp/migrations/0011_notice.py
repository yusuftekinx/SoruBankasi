# Generated by Django 3.1.4 on 2021-03-09 09:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0010_auto_20210301_1252'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('NoticeTitle', models.CharField(max_length=50)),
                ('NoticeContent', models.TextField()),
                ('NoticeDate', models.DateTimeField(auto_now_add=True)),
                ('NoticeAuthor', models.CharField(max_length=50)),
                ('NoticeAuthorId', models.IntegerField()),
            ],
        ),
    ]