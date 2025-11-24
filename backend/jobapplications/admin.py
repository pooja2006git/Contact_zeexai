from django.contrib import admin
from .models import JobApplication


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email', 'mobile', 'position', 'experience', 'created_at']
    list_filter = ['experience', 'created_at']
    search_fields = ['full_name', 'email', 'position']
    readonly_fields = ['created_at']
