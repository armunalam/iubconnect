from rest_framework import routers
from .api import AccountViewSet, UserViewSet, SchoolViewSet

router = routers.DefaultRouter()
router.register('api/account', AccountViewSet, 'account')
router.register('api/user', UserViewSet, 'user')
router.register('api/school', SchoolViewSet, 'school')

urlpatterns = router.urls
