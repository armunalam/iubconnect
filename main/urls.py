from rest_framework import routers
from .api import AccountViewSet, UserViewSet

router = routers.DefaultRouter()
router.register('api/account', AccountViewSet, 'account')
router.register('api/user', UserViewSet, 'user')

urlpatterns = router.urls
