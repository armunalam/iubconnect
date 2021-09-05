from django.urls import path, include
from rest_framework import routers
from knox import views as knox_views
from .api import (AccountViewSet, CustomViewSet,
                  UserViewSet,
                  SchoolViewSet,
                  UserAPI,
                  RegisterAPI,
                  LoginAPI,
                  TestView,
                  DepartmentViewSet,
                  AccountAllViewSet,
                  CustomViewSet,
                  EducationViewSet,
                  ExperienceViewSet,
                  SearchViewSet,
                  UserProfileViewSet)

router = routers.DefaultRouter()
router.register('api/account', AccountViewSet, 'account')
# router.register('api/user', UserViewSet, 'user')
router.register('api/school', SchoolViewSet, 'school')
router.register('api/department', DepartmentViewSet, 'department')
router.register('api/allaccount', AccountAllViewSet, 'allaccount')
router.register('api/test', TestView, 'test')

urlpatterns = router.urls
urlpatterns += [
    path('api/auth', include('knox.urls')),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    
    path('api/customview', CustomViewSet.as_view()),
    path('api/education', EducationViewSet.as_view()),
    path('api/experience', ExperienceViewSet.as_view()),
    path('api/search', SearchViewSet.as_view()),
    path('api/user', UserProfileViewSet.as_view()),
]
