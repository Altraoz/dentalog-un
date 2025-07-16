from rest_framework import serializers
from .models import (
    ClinicalCases, EvolutionNotes, EvolutionTypes, Evolutions, NoteImages,
     AppointmentTypes, Appointments, Procedures, Activities
)

from users.models import (Patients)

class ClinicalCasesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicalCases
        fields = [
            'id', 'created_at', 'patient', 'updated_at', 'status', 'summary',
            'initial_diagnosis', 'final_diagnosis', 'treatment_plan'
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
        extra_kwargs = {
            'id': {'read_only': True}
        }

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
class AppointmentTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentTypes
        fields = ['id', 'name', 'description']

class AppointmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointments
        fields = [
            'id', 'title', 'created_at', 'attention_date', 'type', 'doctor',
            'clinical_case', 'status', 'duration', 'updated_at'
        ]
        extra_kwargs = {
            'created_at': {'read_only': True},
        }

class ProceduresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Procedures
        fields = [
            'id', 'created_at', 'name', 'start_date', 'end_date',
            'description', 'activations','is_frecuent', 'clinical_case'
        ]
        extra_kwargs = {
            'created_at': {'read_only': True},
            'id': {'read_only': True}
        }

class ActivitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activities
        fields = [
            'id', 'created_at', 'name','is_done','procedure',
        ]
        extra_kwargs = {
            'created_at': {'read_only': True}, 'id': {'read_only': True}
        }


class ActivitiesinAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activities
        fields = [
            'id', 'created_at', 'name','is_done','procedure',
        ]
        extra_kwargs = {
            'created_at': {'read_only': True}, 'id': {'read_only': True}
        }



class ProceduresinAppointmentSerializer(serializers.ModelSerializer):
    activities = ActivitiesinAppointmentSerializer(many=True)
    class Meta:
        model = Procedures
        fields = [
            'id', 'created_at', 'name', 'start_date', 'description', 'activations',
            'is_frecuent', 'activities', 'clinical_case'
        ]
        extra_kwargs = {
            'created_at': {'read_only': True},
            'id': {'read_only': True}
        }
    def create(self, validated_data):
        activities_data = validated_data.pop('activities')
        procedure = Procedures.objects.create(**validated_data)
        for activity_data in activities_data:
            Activities.objects.create(procedure=procedure, **activity_data)
        return procedure






class ClinicalCasesinAppointmentSerializer(serializers.ModelSerializer):

    procedures = ProceduresinAppointmentSerializer(many=True)

    class Meta:
        model = ClinicalCases
        fields = [
            'id', 'created_at', 'status', 'summary',
            'initial_diagnosis', 'final_diagnosis', 'treatment_plan', 'procedures',
        ]
        extra_kwargs = {
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True}
        }

    def create(self, validated_data):
        procedures_data = validated_data.pop('procedures')
        clinical_case = ClinicalCases.objects.create(**validated_data)

        for procedure_data in procedures_data:
            activities_data = procedure_data.pop('activities')
            procedure = Procedures.objects.create(clinical_case=clinical_case, **procedure_data)

            for activity_data in activities_data:
                Activities.objects.create(procedure=procedure, **activity_data)

        return clinical_case

# class ProceduresinAppointmentSerializer(serializers.ModelSerializer):

#     procedures = ProceduresSerializer(many=True, read_only=True)

#     class Meta:
#         model = ClinicalCases
#         fields = [
#             'id', 'created_at', 'status', 'summary',
#             'initial_diagnosis', 'final_diagnosis', 'treatment_plan', 'procedures',
#         ]
#         extra_kwargs = {
#             'created_at': {'read_only': True},
#             'updated_at': {'read_only': True}
#         }