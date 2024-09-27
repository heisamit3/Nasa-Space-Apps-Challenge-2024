from django.urls import path
from .views import message_view

urlpatterns = [
    path('api/message/', message_view, name='message_view'),
]
