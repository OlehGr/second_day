from django.urls import path

from custom_user.views import login

urlpatterns = [
    path('login', login)
]
