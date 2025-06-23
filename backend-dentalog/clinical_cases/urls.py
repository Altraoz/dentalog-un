from .views import ClinicalCaseViewSet, StageViewSet, AppointmentViewSet, NoteViewSet, ReportViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'clinical-cases', ClinicalCaseViewSet)
router.register(r'stages', StageViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'notes', NoteViewSet)
router.register(r'reports', ReportViewSet)

urlpatterns = router.urls