# Generated by Django 3.1.4 on 2021-03-01 09:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0007_auto_20210301_1231'),
    ]

    operations = [
        migrations.AlterField(
            model_name='categories',
            name='image',
            field=models.ImageField(default='/defaultphoto.jpg', null=True, upload_to='categoriesuploads/%Y/%m/%d'),
        ),
    ]
