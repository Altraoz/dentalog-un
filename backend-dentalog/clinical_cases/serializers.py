from rest_framework import serializers
from .models import (
    ClinicalCases, EvolutionNotes, EvolutionTypes, Evolutions, NoteImages,
    AppointmentInventory, AppointmentTypes, Appointments
)

class ClinicalCasesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicalCases
        fields = [
            'id', 'created_at', 'patient', 'doctor', 'status', 'summary',
            'initial_diagnosis', 'final_diagnosis', 'treatment_plan', 'updated_at'
        ]
        extra_kwargs = {
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True}
        }

class EvolutionNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvolutionNotes
        fields = ['id', 'created_at', 'evolution', 'title', 'description']
        extra_kwargs = {
            'created_at': {'read_only': True}
        }

class EvolutionTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvolutionTypes
        fields = ['id', 'name', 'description']

class EvolutionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evolutions
        fields = [
            'id', 'created_at', 'appointment', 'type', 'last_evolution',
            'percent_advance', 'description', 'title', 'clinical_case'
        ]
        extra_kwargs = {
            'created_at': {'read_only': True}
        }

class NoteImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteImages
        fields = ['id', 'created_at', 'id_note', 'description']
        extra_kwargs = {
            'created_at': {'read_only': True}
        }

class AppointmentInventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentInventory
        fields = [
            'id', 'created_at', 'appointment', 'item', 'amount_used',
            'description', 'used_by', 'uset_at'
        ]
        extra_kwargs = {
            'created_at': {'read_only': True}
        }

class AppointmentTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentTypes
        fields = ['id', 'name', 'description']

class AppointmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointments
        fields = [
            'id', 'created_at', 'attention_date', 'type', 'doctor',
            'clinical_case', 'status', 'notes', 'duration', 'updated_at'
        ]
        extra_kwargs = {
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True}
        }