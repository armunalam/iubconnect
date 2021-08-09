from django.db import models

# Create your models here.

class Account(models.Model):
    user_ID = models.CharField(max_length=7, primary_key=True)
    user_name = models.CharField(max_length=15)
    user_type = models.CharField(max_length=8)
    password = models.CharField(max_length=10)
    email = models.CharField(max_length=15)
    phone = models.CharField(max_length=15)
    address = models.CharField(max_length=30)

class School(models.Model):
    school_ID = models.CharField(max_length=5, primary_key=True)
    school_name = models.CharField(max_length=30)
    
class Department(models.Model):
    department_ID = models.CharField(max_length=5, primary_key=True)
    department_name = models.CharField(max_length=30)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    
class Program(models.Model):
    program_ID = models.CharField(max_length=5, primary_key=True)
    program_name = models.CharField(max_length=30)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, default='N/A')

class Student(models.Model):
    student_ID = models.CharField(max_length=7, primary_key=True)
    fname = models.CharField(max_length=20, null=True)
    lname = models.CharField(max_length=20, null=True)
    date_of_birth = models.DateField(null=True)
    gender = models.CharField(max_length=1, null=True)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    user_ID = models.ForeignKey(Account, on_delete=models.CASCADE)
    
class Alumni(models.Model):
    student_ID = models.CharField(max_length=7, primary_key=True)
    fname = models.CharField(max_length=20, null=True)
    lname = models.CharField(max_length=20, null=True)
    date_of_birth = models.DateField(null=True)
    gender = models.CharField(max_length=1, null=True)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    user_ID = models.ForeignKey(Account, on_delete=models.CASCADE)
    year_enrolled = models.DateField()
    year_graduated = models.DateField()
    employment_status = models.BooleanField()
    occupation = models.CharField(max_length=30, null=True)

class Faculty(models.Model):
    faculty_id = models.CharField(max_length=4, primary_key=True)
    fname = models.CharField(max_length=20, null=True)
    lname = models.CharField(max_length=20, null=True)
    date_of_birth = models.DateField(null=True)
    gender = models.CharField(max_length=1, null=True)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    user_ID = models.ForeignKey(Account, on_delete=models.CASCADE)

class Area_of_Interest(models.Model):
    domain_id = models.CharField(max_length = 15, primary_key=True)
    domain_name = models.CharField(max_length=30)
    user_ID = models.ForeignKey(auth_user)
    
