from django.shortcuts import render

from rest_framework import viewsets
from .models import ClinicalCase, Stage, Appointment, Note, Report
from .serializers import ClinicalCaseSerializer, StageSerializer, AppointmentSerializer, NoteSerializer, ReportSerializer

class ClinicalCaseViewSet(viewsets.ModelViewSet):
    queryset = ClinicalCase.objects.all()
    serializer_class = ClinicalCaseSerializer

class StageViewSet(viewsets.ModelViewSet):
    queryset = Stage.objects.all()
    serializer_class = StageSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
