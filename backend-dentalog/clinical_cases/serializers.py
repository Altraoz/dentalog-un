from rest_framework import serializers
from .models import (
    ClinicalCases, EvolutionTypes, Evolutions, ImagesMedicalFiles, MedicalFiles,
     AppointmentTypes, Appointments, Procedures, Activities, EvolutionImage, ActivitiesAppointments
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

class EvolutionTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvolutionTypes
        fields = ['id', 'name', 'description']
        extra_kwargs = {
            'id': {'read_only': True}
        }

class EvolutionImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvolutionImage
        fields = ['id', 'evolution', 'patient', 'image_url', 'created_at',]

class EvolutionsSerializer(serializers.ModelSerializer):
    images = EvolutionImageSerializer(many=True, read_only=True)
    image_ids = serializers.ListField(
        write_only=True, child=serializers.IntegerField(), required=False
    )

    class Meta:
        model = Evolutions
        fields = [
            'id', 'created_at', 'appointment', 'type',
            'percent_advance', 'description', 'title','images', 'image_ids'
        ]
        extra_kwargs = {
            'created_at': {'read_only': True}
        }
    def create(self, validated_data):
        image_ids = validated_data.pop('image_ids', [])
        evolution = super().create(validated_data)
        images = EvolutionImage.objects.filter(id__in=image_ids)
        print(image_ids)
        print("Image IDs encontrados:", list(images.values_list('id', flat=True)))
        EvolutionImage.objects.filter(id__in=image_ids).update(evolution=evolution)
        return evolution

class AppointmentTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentTypes
        fields = ['id', 'name', 'description']


class ActivitiesAppointmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivitiesAppointments
        fields = ['activity', 'appointment']  # ✅ ahora sí lo incluye
        extra_kwargs = {
            'appointment': {'required': False}
        }
class AppointmentSerializer(serializers.ModelSerializer):
    # aquí usarás el serializer anidado para read & write
    activities = ActivitiesAppointmentsSerializer(source='activities_links', many=True)

    class Meta:
        model = Appointments
        fields = [
            'id', 'patient', 'attention_date', 'type', 'time',
            'clinical_case', 'procedure', 'status', 'activities'
        ]

    def create(self, validated_data):
        activities_data = validated_data.pop('activities_links', [])  # usa el 'source'
        appointment = Appointments.objects.create(**validated_data)
                
        for activity_data in activities_data:
            activity = activity_data.get("activity")
            if not activity:
                raise serializers.ValidationError({
                    "activities": "Each activity must include 'id_activity'."
                })

            ActivitiesAppointments.objects.create(
                appointment=appointment,
                activity=activity 
            )
        return appointment
    
    def update(self, instance, validated_data):
        # Extraemos actividades
        new_activities_data = validated_data.pop('activities_links', [])

        # Actualizamos los campos normales del appointment
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Actualizamos las actividades asociadas
        # 1. Obtener los nuevos IDs de actividades
        new_activity_ids = [activity_data['activity'].id for activity_data in new_activities_data]
        print(new_activity_ids)
        # 2. Eliminar actividades existentes que ya no están
        ActivitiesAppointments.objects.filter(appointment=instance).exclude(activity_id__in=new_activity_ids).delete()

        # 3. Agregar nuevas actividades (evitando duplicados)
        existing_links = ActivitiesAppointments.objects.filter(appointment=instance).values_list('activity_id', flat=True)

        for activity_id in new_activity_ids:
            if activity_id not in existing_links:
                ActivitiesAppointments.objects.create(
                    appointment=instance,
                    activity_id=activity_id
                )
        return instance

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
            'id', 'created_at', 'name','is_done','procedure', 'list_index'
        ]
        extra_kwargs = {
            'created_at': {'read_only': True}, 'id': {'read_only': True}
        }

class ActivitiesinAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activities
        fields = [
            'id', 'created_at', 'name','is_done','procedure','list_index'
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
            'is_frecuent', 'activities', 'clinical_case',
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

    def update(self, instance, validated_data):
        activities_data = validated_data.pop('activities', [])

        # Actualiza los campos del procedimiento
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Obtener las actividades actuales
        existing_activities = {act.id: act for act in instance.activities.all()}
        received_ids = []

        for activity_data in activities_data:
            activity_id = activity_data.get('id')

            if activity_id and activity_id in existing_activities:
                # Actualizar solo los campos que vienen (parcialmente)
                actividad = existing_activities[activity_id]
                for attr, value in activity_data.items():
                    if attr != 'id' and getattr(actividad, attr) != value:
                        setattr(actividad, attr, value)
                actividad.save()
                received_ids.append(activity_id)

            else:
                # Nueva actividad: asegurar que venga list_index
                if 'list_index' not in activity_data:
                    raise serializers.ValidationError({
                        "activities": "New activities must include 'list_index'."
                    })
                Activities.objects.create(procedure=instance, **activity_data)

        # Eliminar actividades que ya no están
        for act_id, act in existing_activities.items():
            if act_id not in received_ids:
                act.delete()

        return instance

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

class MedicalFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalFiles
        fields = [
            'id',
            'created_at',
            'name',
            'patient',
            'details',
            'image_url'
        ]
        read_only_fields = ['id', 'created_at']

class ImagesMedicalFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagesMedicalFiles
        fields = ['id', 'patient', 'image_url']
        read_only_fields = ['id']