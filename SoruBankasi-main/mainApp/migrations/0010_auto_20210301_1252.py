# Generated by Django 3.1.4 on 2021-03-01 09:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0009_auto_20210301_1247'),
    ]

    operations = [
        migrations.AlterField(
            model_name='categories',
            name='image',
            field=models.ImageField(blank=True, default='defaultphoto.jpg', null=True, upload_to='categoriesuploads/%Y/%m/%d'),
        ),
        migrations.AlterField(
            model_name='questions',
            name='SoruGorseli',
            field=models.ImageField(blank=True, null=True, upload_to='questions-soruuploads/%Y/%m/%d'),
        ),
    ]
