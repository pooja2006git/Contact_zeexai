from django.urls import path
from . import views

app_name = 'jobapplications'

urlpatterns = [
    path('applications/', views.create_application, name='create_application'),
]

