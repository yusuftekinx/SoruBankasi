from django.contrib import admin
from .models import exams, categories, topics, questions,Notice


class TopicAdmin(admin.ModelAdmin):
    list_display = ['topicname', 'exams']
    list_display_links = ['topicname', 'exams']
    search_fields = ['topicname']


admin.site.register(exams)
admin.site.register(categories)
admin.site.register(topics, TopicAdmin)
admin.site.register(questions)
admin.site.register(Notice)




