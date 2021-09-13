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
    user = models.ForeignKey(
        User, related_name='account', on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50, null=True)
    last_name = models.CharField(max_length=50, null=True)
    iub_id_number = models.CharField(max_length=15, null=True)
    date_of_birth = models.DateField(null=True)
    GENDER_OPTIONS = (
        ('Male', 'Male'),
        ('Female', 'Female'),
    )
    gender = models.CharField(max_length=6, choices=GENDER_OPTIONS)
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=30, null=True)
    USER_TYPE_OPTIONS = (
        ('Student', 'Student'),
        ('Faculty', 'Faculty'),
        ('Alumnus', 'Alumnus'),
    )
    user_type = models.CharField(max_length=7, choices=USER_TYPE_OPTIONS)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.user)


class UserEducation(models.Model):
    user = models.ForeignKey(
        User, related_name='user_education', on_delete=models.CASCADE)
    name = models.CharField(max_length=60, null=True)
    qual = models.CharField(max_length=60, null=True)
    year = models.CharField(max_length=15, null=True)
    

class UserExperience(models.Model):
    user = models.ForeignKey(
        User, related_name='user_experience', on_delete=models.CASCADE)
    title = models.CharField(max_length=60, null=True)
    pos = models.CharField(max_length=60, null=True)
    year = models.CharField(max_length=15, null=True)


class Connection(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='user')
    connected_user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='connected_user')
    requested_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='requested_by', null=True)
    STATUS_OPTIONS = (
        ('Requested', 'Requested'),
        ('Connected', 'Connected'),
    )
    status = models.CharField(max_length=9, choices=STATUS_OPTIONS)

    class Meta:
        unique_together = ('user', 'connected_user')


class Alumnus(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    year_enrolled = models.DateField()
    year_graduated = models.DateField()
    employment_status = models.BooleanField()
    occupation = models.CharField(max_length=30, null=True)


class AreaOfInterest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    domain_name = models.CharField(max_length=30)
