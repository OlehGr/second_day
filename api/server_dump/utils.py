from rest_framework.utils import json
from rest_framework.views import exception_handler
from rest_framework import exceptions
from rest_framework import status
from django.contrib.auth.models import AbstractUser

class CustomResponseMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request, *args, **kwargs):
        response = self.get_response(request)

        if response.status_code != 200 and response.status_code != 201 and response.status_code != 204:
            return response

        if hasattr(response, 'data') and response.data:
            response.data = {'data': response.data}
            response.content = json.dumps(response.data)

        return response


error_messages = {
    '422': 'Validation error',
    '403': 'Вы должны авторизоваться.',
    '401': 'Unauthorized'
}

exceptions.ValidationError.status_code = 422


def custom_exceptions_handler(exc, context):
    try:
        response = exception_handler(exc, context)
        if response:
            errors_details = response.data
            code = response.status_code

            if 'detail' in errors_details:
                if errors_details['detail'] == 'Login or password incorrect.':
                    errors_details.pop('detail', None)
                    errors_details['login'] = ['Login or password incorrect.']
                elif errors_details['detail'] == 'Authentication credentials were not provided.' or errors_details[
                    'detail'] == 'Вы должны авторизоваться.':
                    errors_details.pop('detail', None)

            idk_by_401 = error_messages[f'{code}'] == 'Вы должны авторизоваться.'

            response.data = {
                "error": {
                    'code': 401 if idk_by_401 else code,
                    'message': 'Unauthorized' if 'login' in errors_details else error_messages[f'{code}'],
                    'errors': errors_details
                }
            }

            if idk_by_401:
                response.status_code = 401

            if len(response.data['error']['errors'].keys()) == 0:
                response.data['error'].pop('errors', None)

        return response
    except:
        return response