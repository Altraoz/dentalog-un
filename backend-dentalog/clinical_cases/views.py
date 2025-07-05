from django.shortcuts import render
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend


# Create your views here.
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status

from .models import (
    ClinicalCases, EvolutionNotes, EvolutionTypes, Evolutions, NoteImages, AppointmentTypes, Appointments, Procedures, Activities
)
from .serializers import (
    ClinicalCasesSerializer, EvolutionNotesSerializer, EvolutionTypesSerializer,
    EvolutionsSerializer, NoteImagesSerializer,
    AppointmentTypesSerializer, AppointmentsSerializer, ProceduresSerializer, ActivitiesSerializer
)

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

    # def list(self, request):
    #     queryset = ClinicalCases.objects.all()
    #     serializer = ClinicalCasesSerializer(queryset, many=True)
    #     return Response(serializer.data)

    # def retrieve(self, request, pk=None):
    #     clinical_case = get_object_or_404(ClinicalCases, pk=pk)
    #     serializer = ClinicalCasesSerializer(clinical_case)
    #     return Response(serializer.data)

    # def create(self, request):
    #     serializer = ClinicalCasesSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def destroy(self, request, pk=None):
    #     clinical_case = get_object_or_404(ClinicalCases, pk=pk)
    #     clinical_case.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)

    # def partial_update(self, request, pk=None):
    #     clinical_case = get_object_or_404(ClinicalCases, pk=pk)
    #     serializer = ClinicalCasesSerializer(clinical_case, data=request.data, partial=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

class EvolutionTypesViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        queryset = EvolutionTypes.objects.all()
        serializer = EvolutionTypesSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        type_obj = get_object_or_404(EvolutionTypes, pk=pk)
        serializer = EvolutionTypesSerializer(type_obj)
        return Response(serializer.data)

    def create(self, request):
        serializer = EvolutionTypesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        type_obj = get_object_or_404(EvolutionTypes, pk=pk)
        type_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def partial_update(self, request, pk=None):
        type_obj = get_object_or_404(EvolutionTypes, pk=pk)
        serializer = EvolutionTypesSerializer(type_obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EvolutionsViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        queryset = Evolutions.objects.all()
        serializer = EvolutionsSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        evolution = get_object_or_404(Evolutions, pk=pk)
        serializer = EvolutionsSerializer(evolution)
        return Response(serializer.data)

    def create(self, request):
        serializer = EvolutionsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        evolution = get_object_or_404(Evolutions, pk=pk)
        evolution.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def partial_update(self, request, pk=None):
        evolution = get_object_or_404(Evolutions, pk=pk)
        serializer = EvolutionsSerializer(evolution, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class NoteImagesViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        queryset = NoteImages.objects.all()
        serializer = NoteImagesSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        image = get_object_or_404(NoteImages, pk=pk)
        serializer = NoteImagesSerializer(image)
        return Response(serializer.data)

    def create(self, request):
        serializer = NoteImagesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        image = get_object_or_404(NoteImages, pk=pk)
        image.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def partial_update(self, request, pk=None):
        image = get_object_or_404(NoteImages, pk=pk)
        serializer = NoteImagesSerializer(image, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AppointmentTypesViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        queryset = AppointmentTypes.objects.all()
        serializer = AppointmentTypesSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        type_obj = get_object_or_404(AppointmentTypes, pk=pk)
        serializer = AppointmentTypesSerializer(type_obj)
        return Response(serializer.data)

    def create(self, request):
        serializer = AppointmentTypesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        type_obj = get_object_or_404(AppointmentTypes, pk=pk)
        type_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def partial_update(self, request, pk=None):
        type_obj = get_object_or_404(AppointmentTypes, pk=pk)
        serializer = AppointmentTypesSerializer(type_obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AppointmentsViewSet(viewsets.ViewSet):    
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        queryset = Appointments.objects.all()
        serializer = AppointmentsSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        appointment = get_object_or_404(Appointments, pk=pk)
        serializer = AppointmentsSerializer(appointment)
        return Response(serializer.data)

    def create(self, request):
        serializer = AppointmentsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        appointment = get_object_or_404(Appointments, pk=pk)
        appointment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def partial_update(self, request, pk=None):
        appointment = get_object_or_404(Appointments, pk=pk)
        serializer = AppointmentsSerializer(appointment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
    filterset_fields = ['id','is_frecuent']
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

