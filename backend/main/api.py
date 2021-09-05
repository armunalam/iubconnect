from rest_framework import viewsets, permissions, generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.forms.models import model_to_dict
from knox.models import AuthToken
from django.contrib.postgres.search import SearchVector
from django.contrib.auth.models import User
from rest_framework.views import APIView
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

        search = Account.objects.annotate(
            search=SearchVector('first_name',
                                'last_name',
                                'user__username',
                                'department',
                                'department__department_name',
                                'user_type')
        ).filter(search=query)

        search = list(search.values('first_name',
                                    'last_name',
                                    'user__username',
                                    'department',
                                    'department__department_name',
                                    'user_type'))

        if (not search):
            for query in query.split(' '):
                search = Account.objects.annotate(
                    search=SearchVector('first_name',
                                        'last_name',
                                        'user__username',
                                        'department',
                                        'department__department_name',
                                        'user_type')
                ).filter(search__icontains=query)

                search = list(search.values('first_name',
                                            'last_name',
                                            'user__username',
                                            'department',
                                            'department__department_name',
                                            'user_type'))
                                            
                if (search):
                    break

        return Response(search)

    # @classmethod
    # def get_extra_actions(cls):
    #     return []


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
