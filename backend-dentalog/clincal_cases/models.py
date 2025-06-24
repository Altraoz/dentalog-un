from django.db import models

class ClinicalCases(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set on creation
    patient = models.ForeignKey('Patients', models.DO_NOTHING, blank=True, null=True)
    doctor = models.ForeignKey('Doctors', models.DO_NOTHING, blank=True, null=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('activo', 'Activo'),
            ('cerrado', 'Cerrado'),
            ('en revision', 'En Revisión'),
            ('referido', 'Referido'),
            ('abandonado', 'Abandonado'),
            ('cancelado', 'Cancelado'),
        ],
        blank=True,
        null=True
    )
    summary = models.TextField(max_length=500, blank=True, null=True)  # Reasonable limit for summary
    initial_diagnosis = models.CharField(max_length=200, blank=True, null=True)
    final_diagnosis = models.CharField(max_length=200, blank=True, null=True)
    treatment_plan = models.CharField(max_length=500, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)  # Automatically updated on each save

    class Meta:
        managed = False
        db_table = 'clinical_cases'
        db_table_comment = 'table of clinical cases in zafari dental'

class EvolutionNotes(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set on creation
    evolution = models.ForeignKey('Evolutions', models.DO_NOTHING, blank=True, null=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    description = models.CharField(max_length=500, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'evolution_notes'
        db_table_comment = 'table of notes'

class EvolutionTypes(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=50)  # Reasonable limit for type name
    description = models.TextField(max_length=500, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'evolution_types'

class Evolutions(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set on creation
    appointment = models.ForeignKey('Appointments', models.DO_NOTHING, blank=True, null=True)
    type = models.ForeignKey(EvolutionTypes, models.DO_NOTHING, db_column='type', blank=True, null=True)
    last_evolution = models.CharField(max_length=200, blank=True, null=True)
    percent_advance = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)  # Adjusted to realistic range (0-100.00)
    description = models.CharField(max_length=500, blank=True, null=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    clinical_case = models.ForeignKey(ClinicalCases, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'evolutions'

class NoteImages(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set on creation
    id_note = models.ForeignKey(EvolutionNotes, models.DO_NOTHING, db_column='id_note', blank=True, null=True)
    description = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'note_images'
        db_table_comment = 'table of images from notes'

class AppointmentInventory(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set on creation
    appointment = models.ForeignKey('Appointments', models.DO_NOTHING, blank=True, null=True)
    item = models.ForeignKey('InventoryItems', models.DO_NOTHING, blank=True, null=True)
    amount_used = models.IntegerField(blank=True, null=True)
    description = models.CharField(max_length=500, blank=True, null=True)
    used_by = models.ForeignKey('Doctors', models.DO_NOTHING, db_column='used_by', blank=True, null=True)
    uset_at = models.CharField(max_length=100, blank=True, null=True)  # Assuming this is a typo for "used_at"

    class Meta:
        managed = False
        db_table = 'appointment_inventory'
        db_table_comment = 'table of items used in an appointment'

class AppointmentTypes(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=50)  # Reasonable limit for type name
    description = models.TextField(max_length=500, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'appointment_types'

class Appointments(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set on creation
    attention_date = models.DateTimeField(blank=True, null=True)
    type = models.ForeignKey(AppointmentTypes, models.DO_NOTHING, db_column='type', blank=True, null=True)
    doctor = models.ForeignKey('Doctors', models.DO_NOTHING, blank=True, null=True)
    clinical_case = models.ForeignKey('ClinicalCases', models.DO_NOTHING, blank=True, null=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('programada', 'Programada'),
            ('finalizada', 'Finalizada'),
            ('cancelada', 'Cancelada'),
            ('no asistió', 'No Asistió'),
            ('en progreso', 'En Progreso'),
            ('reprogramada', 'Reprogramada'),
        ],
        blank=True,
        null=True
    )
    notes = models.CharField(max_length=500, blank=True, null=True)
    duration = models.DurationField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)  # Automatically updated on each save

    class Meta:
        managed = False
        db_table = 'appointments'
        db_table_comment = 'table of appointments'




    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set on creation
    patient = models.ForeignKey('Patients', models.DO_NOTHING, blank=True, null=True)
    doctor = models.ForeignKey('Doctors', models.DO_NOTHING, blank=True, null=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('activo', 'Activo'),
            ('cerrado', 'Cerrado'),
            ('en revision', 'En Revisión'),
            ('referido', 'Referido'),
            ('abandonado', 'Abandonado'),
            ('cancelado', 'Cancelado'),
        ],
        blank=True,
        null=True
    )


