from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
User = get_user_model()

class UserAuthBackend(object):

    def authenticate(self, username=None, password=None):
        try:
            user = User.objects.get(username=username)

            if user.check_password(password):
                # Authentication success by returning the user
                return user
            else:
                # Authentication fails if None is returned
                return None
        except User.DoesNotExist:
            return None

    def get_user(self, username):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            return None