from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import * 

router = DefaultRouter()
router.register('cases', ClinicalCasesViewSet, basename='cases')

router.register('procedures', ProceduresViewSet, basename='procedures')
router.register('activities', ActivitiesViewSet, basename='activities')
router.register('procedures_in_appointment', ProceduresinAppointmentViewSet, basename='procedures_in_appointment')


router.register('appointments', AppointmentsViewSet, basename='appointments')
router.register('appointment_types', AppointmentTypesViewSet, basename='appointment_types')
router.register('activities_appointments', ActivitiesAppointmentsViewSet, basename='activities_appointments')

router.register('evolutions', EvolutionsViewSet, basename='evolutions')
router.register('evolution_types', EvolutionTypesViewSet, basename='evolution_types')

router.register('appoinment_payload', uwu, basename='appoinment_payload')

router.register('upload_images', EvolutionImageViewSet, basename='upload_evolutions')
router.register('upload_medical_files', ImagesMedicalFilesViewSet, basename='upload_medical_files')
router.register('medical_files', MedicalFilesViewSet, basename='medical_files')


# router.register('login', LoginViewset, basename='login')
# router.register('users', UserViewset, basename='users')
# router.register('permissions', PermissionsViewset, basename='permissions')
# router.register('roles', RolesViewset, basename='roles')
urlpatterns = router.urls

