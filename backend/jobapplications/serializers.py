from rest_framework import serializers
from .models import JobApplication
import re


class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = ['id', 'full_name', 'email', 'mobile', 'position', 'experience', 'resume', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def validate_email(self, value):
        """Validate email format"""
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, value):
            raise serializers.ValidationError("Enter a valid email address.")
        return value
    
    def validate_mobile(self, value):
        """Validate mobile number: must be exactly 10 digits"""
        if not value.isdigit():
            raise serializers.ValidationError("Mobile number must contain only digits.")
        if len(value) != 10:
            raise serializers.ValidationError("Mobile number must be exactly 10 digits.")
        return value
    
    def validate_resume(self, value):
        """Validate resume file size (max 1MB)"""
        max_size = 1 * 1024 * 1024  # 1MB in bytes
        if value.size > max_size:
            raise serializers.ValidationError("Resume file size must not exceed 1MB.")
        return value

