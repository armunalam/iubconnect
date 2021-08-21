from django.shortcuts import render


def index(request):
    return render(request, 'front/index.html')


def loginpage(request):
    return render(request, 'front/login-dark-white.html')
