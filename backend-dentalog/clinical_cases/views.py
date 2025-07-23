from django.shortcuts import render
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from decouple import config
import uuid
import os


# Create your views here.
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status

from .models import (
    ClinicalCases, EvolutionTypes, Evolutions, AppointmentTypes, Appointments, Procedures, Activities, ActivitiesAppointments
)
from .serializers import (
    ClinicalCasesinAppointmentSerializer, ClinicalCasesSerializer, EvolutionTypesSerializer,
    EvolutionsSerializer, ActivitiesAppointmentsSerializer,
    AppointmentTypesSerializer, AppointmentSerializer, ProceduresSerializer, ActivitiesSerializer, ProceduresinAppointmentSerializer
)

from users.serializers import (Patients)

class ClinicalCasesViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    queryset = ClinicalCases.objects.all()
    serializer_class = ClinicalCasesSerializer

    @action(detail=False, methods=['get'], url_path='search')
    def search_by_patient(self, request):
        patient_id = request.query_params.get('patient')
        if not patient_id:
            return Response({"error": "Missing patient parameter"}, status=400)

        cases = ClinicalCases.objects.filter(patient_id=patient_id)
        serializer = self.get_serializer(cases, many=True)
        return Response(serializer.data)

class EvolutionNotesViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        queryset = EvolutionNotes.objects.all()
        serializer = EvolutionNotesSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        note = get_object_or_404(EvolutionNotes, pk=pk)
        serializer = EvolutionNotesSerializer(note)
        return Response(serializer.data)

    def create(self, request):
        serializer = EvolutionNotesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        note = get_object_or_404(EvolutionNotes, pk=pk)
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def partial_update(self, request, pk=None):
        note = get_object_or_404(EvolutionNotes, pk=pk)
        serializer = EvolutionNotesSerializer(note, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EvolutionTypesViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = EvolutionTypes.objects.all()
    serializer_class = EvolutionTypesSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'name']
class EvolutionsViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Evolutions.objects.all()
    serializer_class = EvolutionsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'title']

class AppointmentTypesViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = AppointmentTypes.objects.all()
    serializer_class = AppointmentTypesSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'name']
    
class ActivitiesAppointmentsViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = ActivitiesAppointments.objects.all()
    serializer_class = ActivitiesAppointmentsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']
    

class AppointmentsViewSet(viewsets.ModelViewSet):    
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AppointmentSerializer
    queryset = Appointments.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id','clinical_case', 'procedure', 'patient']


class ProceduresViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProceduresSerializer
    queryset = Procedures.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id','is_frecuent']

class ProceduresViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProceduresSerializer
    queryset = Procedures.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id','is_frecuent','clinical_case']

class ActivitiesViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ActivitiesSerializer
    queryset = Activities.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id','procedure','is_done']

class getClinicalCasesFromPatient(viewsets.ModelViewSet):
   serializer_class = ClinicalCasesSerializer
   def get_queryset(self):
    patient_id = self.request.query_params.get('patient')
    if patient_id:
        return ClinicalCases.objects.filter(patient_id=patient_id)
    return ClinicalCases.objects.all()


class uwu(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ClinicalCasesinAppointmentSerializer
    queryset = ClinicalCases.objects.all()

class ProceduresinAppointmentViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProceduresinAppointmentSerializer
    queryset = Procedures.objects.all()

#https://chatgpt.com/c/6869f455-4360-800b-835b-dc9295ac8445


from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import EvolutionImage
from .serializers import EvolutionImageSerializer

class EvolutionImageViewSet(viewsets.ModelViewSet):
    queryset = EvolutionImage.objects.all()
    serializer_class = EvolutionImageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        file = request.FILES.get("file")
        patient = request.data.get("patient")

        try:
            patient_instance = Patients.objects.get(id=patient)
        except Patients.DoesNotExist:
            return Response({"error": "Paciente no encontrado"}, status=404)

        if not file:
            return Response({"error": "No file uploaded"}, status=400)

        supabase_url = config('SUPABASE_URL')
        bucket = "evolutions"
        supabase_key = config("SERVICE_ROL")

        ext = os.path.splitext(file.name)[1]  # e.g., '.jpg'
        unique_id = uuid.uuid4().hex
        filename = f"{patient}/{unique_id}{ext}"

        import requests

        headers = {
            "apikey": supabase_key,
            "Authorization": f"Bearer {supabase_key}",
            "Content-Type": "application/octet-stream"
        }

        upload_url = f"{supabase_url}/storage/v1/object/{bucket}/{filename}"
        res = requests.post(upload_url, headers=headers, data=file.read())

        if res.status_code not in [200, 201]:
            return Response({"error": res.text}, status=400)

        public_url = f"{supabase_url}/storage/v1/object/public/{bucket}/{filename}"

        image = EvolutionImage.objects.create(
            patient=patient_instance,
            image_url=public_url
        )

        return Response(EvolutionImageSerializer(image).data, status=201)