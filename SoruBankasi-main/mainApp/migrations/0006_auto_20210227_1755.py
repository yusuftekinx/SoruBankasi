# Generated by Django 3.1.4 on 2021-02-27 14:55

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0005_questions_authorid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='questions',
            name='SoruMetni',
            field=ckeditor.fields.RichTextField(),
        ),
    ]