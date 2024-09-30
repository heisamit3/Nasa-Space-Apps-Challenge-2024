from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.validators import UniqueValidator

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

    class Meta:
        model = User
        fields = ('email', 'password')

    def create(self, validated_data):
        # Set the username to be the same as the email
        user = User(
            username=validated_data['email'],  # Set username to email
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
