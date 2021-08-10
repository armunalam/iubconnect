from rest_framework import viewsets, permissions
from django.contrib.auth.models import User
from .models import Account
from .serializers import AccountSerializer, UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = UserSerializer



class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = AccountSerializer
