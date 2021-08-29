from django.urls import path, include
from rest_framework import routers
from knox import views as knox_views
from .api import (AccountViewSet,
                  UserViewSet,
                  SchoolViewSet,
                  UserAPI,
                  RegisterAPI,
                  LoginAPI,
                  TestView,
                  DepartmentViewSet,
                  AccountAllViewSet,)
                #   AccountPostViewSet)

router = routers.DefaultRouter()
router.register('api/account', AccountViewSet, 'account')
router.register('api/user', UserViewSet, 'user')
router.register('api/school', SchoolViewSet, 'school')
router.register('api/department', DepartmentViewSet, 'department')
router.register('api/allaccount', AccountAllViewSet, 'allaccount')
# router.register('api/postaccount', AccountPostViewSet, 'postaccount')
router.register('api/test', TestView, 'test')

urlpatterns = router.urls
urlpatterns += [
    path('api/auth', include('knox.urls')),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    # path('api/postaccount/', AccountPostViewSet),
]
