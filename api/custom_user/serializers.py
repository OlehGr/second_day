from rest_framework import serializers

from custom_user.models import Users


class LoginSerializer(serializers.Serializer):
    login = serializers.CharField(max_length=255, allow_null=False, allow_blank=False)
    password = serializers.CharField(max_length=255, allow_blank=False, allow_null=False)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
