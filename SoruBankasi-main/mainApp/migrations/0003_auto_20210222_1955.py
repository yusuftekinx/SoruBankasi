# Generated by Django 3.1.6 on 2021-02-22 16:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0002_auto_20210221_1834'),
    ]

    operations = [
        migrations.AddField(
            model_name='categories',
            name='image',
            field=models.ImageField(null=True, upload_to='uploadedimages/kategorigorseliuploads/%Y/%m/%d'),
        ),
        migrations.AddField(
            model_name='topics',
            name='image',
            field=models.ImageField(null=True, upload_to='uploadedimages/kategorigorseliuploads/%Y/%m/%d'),
        ),
        migrations.AlterField(
            model_name='questions',
            name='CozumGorseli',
            field=models.ImageField(null=True, upload_to='uploadedimages/cozumgorseliuploads/%Y/%m/%d'),
        ),
        migrations.AlterField(
            model_name='questions',
            name='SoruGorseli',
            field=models.ImageField(null=True, upload_to='uploadedimages/sorugorseliuploads/%Y/%m/%d'),
        ),
    ]