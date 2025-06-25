from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status

from .models import (
    ClinicalCases, EvolutionNotes, EvolutionTypes, Evolutions, NoteImages,
    AppointmentInventory, AppointmentTypes, Appointments
)
from .serializers import (
    ClinicalCasesSerializer, EvolutionNotesSerializer, EvolutionTypesSerializer,
    EvolutionsSerializer, NoteImagesSerializer, AppointmentInventorySerializer,
    AppointmentTypesSerializer, AppointmentsSerializer
)

class ClinicalCasesViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        queryset = ClinicalCases.objects.all()
        serializer = ClinicalCasesSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        clinical_case = get_object_or_404(ClinicalCases, pk=pk)
        serializer = ClinicalCasesSerializer(clinical_case)
        return Response(serializer.data)

    def create(self, request):
        serializer = ClinicalCasesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        clinical_case = get_object_or_404(ClinicalCases, pk=pk)
        clinical_case.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def partial_update(self, request, pk=None):
        clinical_case = get_object_or_404(ClinicalCases, pk=pk)
        serializer = ClinicalCasesSerializer(clinical_case, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

class AppointmentInventoryViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        queryset = AppointmentInventory.objects.all()
        serializer = AppointmentInventorySerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        inventory = get_object_or_404(AppointmentInventory, pk=pk)
        serializer = AppointmentInventorySerializer(inventory)
        return Response(serializer.data)

    def create(self, request):
        serializer = AppointmentInventorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        inventory = get_object_or_404(AppointmentInventory, pk=pk)
        inventory.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def partial_update(self, request, pk=None):
        inventory = get_object_or_404(AppointmentInventory, pk=pk)
        serializer = AppointmentInventorySerializer(inventory, data=request.data, partial=True)
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