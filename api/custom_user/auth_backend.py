from rest_framework import authentication
from rest_framework import exceptions
from rest_framework import status

# binascii.hexlify(os.urandom(20)).decode()
from custom_user.models import Users

exceptions.AuthenticationFailed.status_code = status.HTTP_401_UNAUTHORIZED

class AuthBackend(authentication.BaseAuthentication):

    authentication_header_prefix = 'Bearer'

    def authenticate(self, request):
        auth_header = authentication.get_authorization_header(request).split()

        if not auth_header or auth_header[0].lower() != b'bearer':
            return None

        if len(auth_header) == 1:
            raise exceptions.AuthenticationFailed('Вы должны авторизоваться.')
        elif len(auth_header) > 2:
            raise exceptions.AuthenticationFailed('Вы должны авторизоваться.')

        try:
            token = auth_header[1].decode('utf-8')
        except UnicodeError:
            raise exceptions.AuthenticationFailed('Вы должны авторизоваться.')

        return self.authenticate_credentials(token)


    def authenticate_credentials(self, token):
        try:
            user = Users.objects.get(api_token=token)
        except Users.DoesNotExist:
            raise exceptions.AuthenticationFailed('Вы должны авторизоваться.')

        return user, None
