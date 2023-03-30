import binascii
import os

from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import exceptions


# Create your views here.
from rest_framework.response import Response

from custom_user.models import Users
from custom_user.serializers import LoginSerializer, UserSerializer


@api_view(['POST'])
def login(request):
    login_serializer = LoginSerializer(data=request.query_params)
    login_serializer.is_valid(raise_exception=True)

    user_data = login_serializer.data

    try:
        instance = Users.objects.get(login=user_data['login'])
    except Users.DoesNotExist:
        raise exceptions.AuthenticationFailed('Login or password incorrect.')

    user = UserSerializer(instance).data

    if user['password'] != user_data['password']:
        raise exceptions.AuthenticationFailed('Login or password incorrect.')

    if not user['api_token']:
        api_token = binascii.hexlify(os.urandom(20)).decode()
        user['api_token'] = api_token

        user_serializer = UserSerializer(instance, data=user)
        user_serializer.is_valid(raise_exception=True)
        user_serializer.save()

        return Response({'token': api_token})

    return Response({'token': user['api_token']})





