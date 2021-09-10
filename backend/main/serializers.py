from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import Account, School, Department


# Authentication Serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, val):
        user = User.objects.create_user(
            val['username'], val['email'], val['password']
        )

        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


# Other Serializers


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'

    def create(self, val):
        account = Account(
            user=val['user'],
            first_name=val['first_name'],
            last_name=val['last_name'],
            iub_id_number=val['iub_id_number'],
            date_of_birth=val['date_of_birth'],
            gender=val['gender'],
            phone=val['phone'],
            user_type=val['user_type'],
            department=val['department'],
        )
        account.save()

        return account


class AccountAllSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(
        source='department.department_name')

    class Meta:
        model = Account
        fields = ['first_name', 'last_name', 'user_type', 'department_name']

    # def to_representation(self, instance):
    #     rep = super(UserSerializer, self).to_representation(instance)
    #     rep['department'] = instance.department.department_name
    #     return rep


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'


# class TestSerializer(serializers.ModelSerializer):
