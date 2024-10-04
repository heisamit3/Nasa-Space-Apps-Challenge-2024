from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Profile
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError('Invalid email or password.')

        # Authenticate the user
        user = authenticate(username=user.username, password=password)
        if user is None:
            raise serializers.ValidationError('Invalid credentials.')

        data['user'] = user
        return data

class SignupSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(write_only=True)
    full_name = serializers.CharField(source='profile.full_name')
    city = serializers.CharField(source='profile.city')
    phone_number = serializers.CharField(source='profile.phone_number')

    class Meta:
        model = User
        fields = ('email', 'password', 'full_name', 'city', 'phone_number')

    def __init__(self, *args, **kwargs):
        super(SignupSerializer, self).__init__(*args, **kwargs)
        # Map incoming frontend fields `fullName` and `phoneNumber` to serializer fields
        if 'fullName' in self.initial_data:
            self.initial_data['full_name'] = self.initial_data.pop('fullName')
        if 'phoneNumber' in self.initial_data:
            self.initial_data['phone_number'] = self.initial_data.pop('phoneNumber')

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User(
            username=validated_data['email'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        
        Profile.objects.create(
            user=user,
            full_name=profile_data['full_name'],
            city=profile_data['city'],
            phone_number=profile_data['phone_number']
        )
        return user
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['full_name', 'city', 'phone_number', 'age', 'email']  # Include all necessary fields