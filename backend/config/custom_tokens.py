from rest_framework_simplejwt.views import (TokenObtainPairView,)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# Custom token obtain pair to get username
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.username
        if user.is_superuser:
            token['admin'] = True
        # ...
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
