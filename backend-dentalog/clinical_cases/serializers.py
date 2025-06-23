from rest_framework import serializers
from .models import ClinicalCase, Stage, Appointment, Note, Report

class StageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stage
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'

class ClinicalCaseSerializer(serializers.ModelSerializer):
    stages = StageSerializer(many=True, read_only=True)
    appointments = AppointmentSerializer(many=True, read_only=True)
    notes = NoteSerializer(many=True, read_only=True)
    reports = ReportSerializer(many=True, read_only=True)

    class Meta:
        model = ClinicalCase
        fields = '__all__'
