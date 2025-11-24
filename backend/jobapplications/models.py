from django.db import models
from django.core.validators import RegexValidator


class JobApplication(models.Model):
    EXPERIENCE_CHOICES = [
        ('0-1 years', '0-1 years'),
        ('1-3 years', '1-3 years'),
        ('3-5 years', '3-5 years'),
        ('5+ years', '5+ years'),
    ]
    
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    mobile = models.CharField(
        max_length=10,
        validators=[
            RegexValidator(
                regex=r'^\d{10}$',
                message='Mobile number must be exactly 10 digits.'
            )
        ]
    )
    position = models.CharField(max_length=255)
    experience = models.CharField(max_length=20, choices=EXPERIENCE_CHOICES)
    resume = models.FileField(upload_to='resumes/')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.full_name} - {self.position}"
