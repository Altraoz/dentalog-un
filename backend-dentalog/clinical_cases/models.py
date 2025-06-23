from django.db import models

from django.db import models
#from django.contrib.auth.models import User  # o tu modelo custom de usuario
from django.conf import settings


class ClinicalCase(models.Model):
    patient_name = models.CharField(max_length=255)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='clinical_cases')
    start_date = models.DateField()
    status = models.CharField(max_length=50, choices=[('open', 'Abierto'), ('closed', 'Cerrado')], default='open')

    def __str__(self):
        return self.patient_name

class Stage(models.Model):
    clinical_case = models.ForeignKey(ClinicalCase, on_delete=models.CASCADE, related_name='stages')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    date = models.DateField()

    def __str__(self):
        return f"{self.name} - {self.clinical_case.patient_name}"

class Appointment(models.Model):
    clinical_case = models.ForeignKey(ClinicalCase, on_delete=models.CASCADE, related_name='appointments')
    date = models.DateTimeField()
    notes = models.TextField(blank=True)

class Note(models.Model):
    clinical_case = models.ForeignKey(ClinicalCase, on_delete=models.CASCADE, related_name='notes')
    date = models.DateField(auto_now_add=True)
    content = models.TextField()

class Report(models.Model):
    clinical_case = models.ForeignKey(ClinicalCase, on_delete=models.CASCADE, related_name='reports')
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)