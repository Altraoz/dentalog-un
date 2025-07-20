from django.db import models

class ClinicalCases(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set on creation
    patient = models.ForeignKey('users.Patients', models.DO_NOTHING,related_name='clinical_cases')
    updated_at = models.DateTimeField(auto_now=True)  # Automatically updated on each save
    status = models.CharField(
        choices=[
            ('activo', 'Activo'),
            ('cerrado', 'Cerrado'),
            ('en revision', 'En Revisión'),
            ('referido', 'Referido'),
            ('abandonado', 'Abandonado'),
            ('cancelado', 'Cancelado'),
        ],
        default='activo',
        max_length=20,
    )
    summary = models.TextField(max_length=500)  # Reasonable limit for summary
    initial_diagnosis = models.CharField(max_length=200)
    final_diagnosis = models.CharField(max_length=200, null=True)
    treatment_plan = models.CharField(max_length=500)

    class Meta:
        managed = False
        db_table = 'clinical_cases'
        db_table_comment = 'table of clinical cases in zafari dental'

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
    percent_advance = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)  # Adjusted to realistic range (0-100.00)
    title = models.CharField(max_length=100, blank=True, null=True)
    description = models.CharField(max_length=500, blank=True, null=True)
    clinical_case = models.ForeignKey(ClinicalCases, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'evolutions'

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
    patient = models.ForeignKey(
    'users.Patients',
    models.DO_NOTHING,
    related_name='appointment',
    db_column='patient'  # <- asegúrate que así se llama la columna en la base de datos
    )
    attention_date = models.DateTimeField(blank=True, null=True)
    type = models.ForeignKey(AppointmentTypes, models.DO_NOTHING, db_column='type', blank=True, null=True)
    time = models.TimeField()  # Django maneja time sin zona horaria por defecto
    clinical_case = models.ForeignKey('ClinicalCases', models.DO_NOTHING, db_column='clinical_case')
    procedure = models.ForeignKey('Procedures', models.CASCADE,null=True, db_column='procedure' , related_name="appointment" )
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
    updated_at = models.DateTimeField(auto_now=True)  # Automatically updated on each save

    class Meta:
        managed = False
        db_table = 'appointments'
        db_table_comment = 'table of appointments'

class Procedures(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set on creation
    name = models.CharField(max_length=50, blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True)
    description = models.CharField(max_length=500, null=True)
    activations = models.CharField(max_length=500, null=True)
    is_frecuent = models.BooleanField(default=False)
    clinical_case = models.ForeignKey('ClinicalCases', models.CASCADE, db_column='clinical_case', related_name="procedures")


    class Meta:
        managed = False
        db_table = 'procedures'

class Activities(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=50)
    procedure = models.ForeignKey('Procedures', models.CASCADE,null=True, related_name="activities" )
    is_done = models.BooleanField(default=False)
    list_index = models.IntegerField()
    class Meta:
        managed = False
        db_table = 'activities'


class ActivitiesAppointments(models.Model):
    id_appointment = models.ForeignKey(
        'Appointments',
        on_delete=models.CASCADE,
        db_column='id_appointment',
        related_name='activities_appointments'
    )
    id_activity = models.ForeignKey(
        'Activities',
        on_delete=models.CASCADE,
        db_column='id_activity',
        related_name='appointments_activities'
    )

    class Meta:
        db_table = 'activities_appointments'
        unique_together = ('id_appointment', 'id_activity')  # ya que ambos son claves primarias
        managed: False


class EvolutionImage(models.Model):
    evolution = models.ForeignKey('Evolutions', models.DO_NOTHING, related_name='images', db_column='evolution')
    image_url = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'evolution_images'
        managed: False

