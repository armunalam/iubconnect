from django.db import models
from django.contrib.auth.models import User


class School(models.Model):
    school_id = models.CharField(max_length=5, primary_key=True)
    school_name = models.CharField(max_length=60)


class Department(models.Model):
    department_id = models.CharField(max_length=5, primary_key=True)
    department_name = models.CharField(max_length=60)
    school = models.ForeignKey(School, on_delete=models.CASCADE)


class Account(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_of_birth = models.DateField(null=True)
    GENDER_OPTIONS = (
        ('m', 'Male'),
        ('f', 'Female'),
    )
    gender = models.CharField(max_length=1, choices=GENDER_OPTIONS)
    phone = models.CharField(max_length=15)
    address = models.CharField(max_length=30)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    
    def __str__(self):
        return str(self.user)


class Alumnus(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    year_enrolled = models.DateField()
    year_graduated = models.DateField()
    employment_status = models.BooleanField()
    occupation = models.CharField(max_length=30, null=True)


class AreaOfInterest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    domain_name = models.CharField(max_length=30)
