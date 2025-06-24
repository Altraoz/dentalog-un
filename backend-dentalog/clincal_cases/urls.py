from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import * 

router = DefaultRouter()
router.register('clinical_cases', ClinicalCasesViewSet, basename='clinical_cases')
# router.register('login', LoginViewset, basename='login')
# router.register('users', UserViewset, basename='users')
# router.register('permissions', PermissionsViewset, basename='permissions')
# router.register('roles', RolesViewset, basename='roles')
urlpatterns = router.urls

