# Generated by Django 3.1.4 on 2021-03-11 10:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0023_auto_20210311_0059'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogmodel',
            name='tagid',
            field=models.ManyToManyField(blank=True, null=True, to='mainApp.Tags'),
        ),
    ]