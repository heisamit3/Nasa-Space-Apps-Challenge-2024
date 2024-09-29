from django.urls import path
from .views import message_view, login_view, signup_view

urlpatterns = [
    path('api/message/', message_view, name='message_view'),
    path('api/login/', login_view, name='login_view'),
    path('api/signup/', signup_view, name='signup_view'),
]
