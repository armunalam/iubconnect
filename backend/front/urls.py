from django.urls import path, re_path
from django.views.generic import TemplateView
from . import views


urlpatterns = [
    path('login', views.loginpage),
    re_path(r'^', TemplateView.as_view(template_name='front/index.html')),
    # path('', views.index),
    # path(r'^(?:.*)/?$', TemplateView.as_view(template_name='front/index.html')),
    # re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name='front/index.html')),
    # re_path(r'^(?:.*)/?$', views.index),
    # re_path('/', TemplateView.as_view(template_name="front/index.html"), name='base'),
]
