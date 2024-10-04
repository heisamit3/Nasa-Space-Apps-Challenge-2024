# models.py
from django.contrib.auth.models import User
from django.db import models

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15, blank=True)

    def __str__(self):
        return self.user.email

class Story(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='stories')
    text = models.TextField()
    city = models.CharField(max_length=100)

    def str(self):
        return f"Story by {self.profile.full_name} in {self.city}"


class Alert(models.Model):
    profiles = models.ManyToManyField(Profile, related_name='alerts')
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='sent_alerts')
    city = models.CharField(max_length=100)
    text = models.TextField()

    def str(self):
        return f"Alert from {self.sender.full_name} in {self.city}"