# Generated by Django 3.1.4 on 2021-03-09 13:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('mainApp', '0014_tags'),
    ]

    operations = [
        migrations.CreateModel(
            name='Blog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('BlogTitle', models.CharField(max_length=60)),
                ('BlogContent', models.TextField()),
                ('BlogAuthorId', models.IntegerField(null=True)),
                ('BlogCreatedDate', models.DateTimeField(auto_now_add=True)),
                ('BlogImage', models.ImageField(blank=True, null=True, upload_to='blogImages/%Y/%m/%d')),
                ('BlogAuthor', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
                ('BlogTags', models.ManyToManyField(blank=True, null=True, to='mainApp.Tags')),
            ],
        ),
    ]
