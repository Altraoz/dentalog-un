from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import * 

router = DefaultRouter()
router.register('register', RegisterViewset, basename='register')
router.register('login', LoginViewset, basename='login')
router.register('users', UserViewset, basename='users')
router.register('permissions', PermissionsViewset, basename='permissions')
router.register('roles', RolesViewset, basename='roles')

router.register('doctors', DoctorViewset, basename='doctors')
router.register('patients', PatientViewset, basename='patients')
router.register('patient-appointment', PatientinAppoinment, basename='patient_appointment')
urlpatterns = router.urls

