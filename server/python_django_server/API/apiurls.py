from django.urls import path
from API import views

urlpatterns = [
    path ('student/',views.StudentList.as_view()),
] 