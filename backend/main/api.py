from rest_framework import viewsets, permissions, generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.forms.models import model_to_dict
from knox.models import AuthToken
from django.contrib.postgres.search import SearchVector
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.views import APIView
import re
from .models import Account, School, Department, UserEducation, UserExperience
from .serializers import (AccountSerializer,
                          UserSerializer,
                          SchoolSerializer,
                          RegisterSerializer,
                          LoginSerializer,
                          DepartmentSerializer,
                          AccountAllSerializer)


# Authentication API

class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'token': AuthToken.objects.create(user)[1]
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })


# Other API

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = UserSerializer


class AccountViewSet(viewsets.ModelViewSet):
    # queryset = Account.objects.all()
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = AccountSerializer

    def get_queryset(self):
        return self.request.user.account.all()

    # def post(self, request, *args, **kwargs):
    #     # serializer = self.get_serializer(data=request.data)
    #     # serializer.is_valid(raise_exception=True)
    #     # account = serializer.save()
    #     # return Response({
    #     #     'user': AccountSerializer(account, context=self.get_serializer_context()).data,
    #     # })

    #     request.data['user'] = self.request.user
    #     print(f'\nPRINTINGGGGGGGG1: {request.data}\n')
    #     serializer = self.get_serializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomViewSet(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # print(request.user)
        print(model_to_dict(Account.objects.get(user=request.user)))

        data = {
            'name': 'Test',
            'type': 'Testing',
            'search': request.query_params.get('search'),
            # 'accounts': list(Account.objects.all().values())
            'account': model_to_dict(Account.objects.get(user=request.user))
            # [dict(user) for user in Account.objects.all()]
        }

        return Response(data)

    def post(self, request):
        School(school_id=request.data.get('school_id'),
               school_name=request.data.get('school_name')).save()
        return Response(request.data)

    @classmethod
    def get_extra_actions(cls):
        return []


class EducationViewSet(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        data = list(UserEducation.objects.filter(user=request.user).values())
        return Response(data)

    def post(self, request):
        if request.data.get('id'):
            data = UserEducation(id=request.data.get('id'),
                                 user=request.user,
                                 name=request.data.get('name'),
                                 qual=request.data.get('qual'),
                                 year=request.data.get('year'))
        else:
            data = UserEducation(user=request.user,
                                 name=request.data.get('name'),
                                 qual=request.data.get('qual'),
                                 year=request.data.get('year'))
        if request.data.get('delete') == 'd':
            data.delete()
            data = {'status': 'deleted'}
        else:
            data.save()
            data = model_to_dict(data)

        return Response(data)

    @classmethod
    def get_extra_actions(cls):
        return []


class ExperienceViewSet(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        data = list(UserExperience.objects.filter(user=request.user).values())
        return Response(data)

    def post(self, request):
        if request.data.get('id'):
            data = UserExperience(id=request.data.get('id'),
                                  user=request.user,
                                  title=request.data.get('title'),
                                  pos=request.data.get('pos'),
                                  year=request.data.get('year'))
        else:
            data = UserExperience(user=request.user,
                                  title=request.data.get('title'),
                                  pos=request.data.get('pos'),
                                  year=request.data.get('year'))
        if request.data.get('delete') == 'd':
            data.delete()
            data = {'status': 'deleted'}
        else:
            data.save()
            data = model_to_dict(data)

        return Response(data)

    @classmethod
    def get_extra_actions(cls):
        return []


class SearchViewSet(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        query = request.query_params.get('q')

        search_query = Account.objects.annotate(
            search=SearchVector('first_name',
                                'last_name',
                                'user__username',
                                'department',
                                'department__department_name',
                                'user_type')
        )

        search = search_query.filter(search=query)

        if (not search):
            for query in query.split(' '):
                search = search_query.filter(search__icontains=query)
                if (search):
                    break

        search = list(search.values('first_name',
                                    'last_name',
                                    'user__username',
                                    'department',
                                    'department__department_name',
                                    'user_type'))

        return Response(search)


class UserProfileViewSet(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        username = request.query_params.get('username')

        account = Account.objects.filter(
            user__username=username
        ).values('first_name', 'last_name', 'user_type', 'gender').first()

        education = UserEducation.objects.filter(
            user__username=username
        ).values()

        experience = UserExperience.objects.filter(
            user__username=username
        ).values()

        if (str(request.user) == username):
            account['is_current_user'] = True
        else:
            account['is_current_user'] = False

        account['education'] = education
        account['experience'] = experience

        return Response(account)


class BasicInfoSettings(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        account = Account.objects.filter(user=request.user).values(
            'id',
            'user__username',
            'first_name',
            'last_name',
            'iub_id_number',
            'user__email',
            'date_of_birth',
            'gender',
            'phone',
            'address',
            'user_type',
            'department__department_id',
        ).first()

        dob = str(account.get('date_of_birth')).split('-')
        try:
            account['year'] = dob[0]
            account['month'] = dob[1]
            account['day'] = dob[2]
        except Exception:
            account['year'] = ''
            account['month'] = ''
            account['day'] = ''

        return Response(account)

    def post(self, request):
        user = User.objects.get(username=request.user)
        user.username = request.data.get('username')
        user.email = request.data.get('email')
        user.save()

        account = Account.objects.get(user=request.user)
        account.first_name = request.data.get('first_name')
        account.last_name = request.data.get('last_name')
        account.iub_id_number = request.data.get('iub_id_number')
        account.date_of_birth = request.data.get('date_of_birth')
        account.gender = request.data.get('gender')
        account.phone = request.data.get('phone')
        account.user_type = request.data.get('user_type')

        department = Department.objects.get(
            department_id=request.data.get('department'))
        account.department = department

        account.save()

        return Response(model_to_dict(account))

    @classmethod
    def get_extra_actions(cls):
        return []


class PasswordSettings(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = authenticate(username=request.user.username,
                            password=request.data.get('password'))
        if user != request.user:
            return Response({'auth': False, 'valid': True})

        new_password = request.data.get('new_password')
        if not (re.search('[0-9]', new_password)
                and re.search('[a-z]', new_password)
                and re.search('[A-z]', new_password)
                and len(new_password) >= 8):
            return Response({'auth': True, 'valid': False})

        user.set_password(new_password)
        user.save()

        return Response({'auth': True, 'valid': True})

    @classmethod
    def get_extra_actions(cls):
        return []


class AccountAllViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()

    permission_classes = [
        permissions.AllowAny,
        # permissions.IsAuthenticated,
    ]

    serializer_class = AccountAllSerializer


class SchoolViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all()
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = SchoolSerializer


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = DepartmentSerializer


class TestView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny,
    ]

    serializer_class = AccountSerializer

    def get_queryset(self):
        return Account.objects.filter(gender='m')
