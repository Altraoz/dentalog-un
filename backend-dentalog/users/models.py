from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager

from django_rest_passwordreset.signals import reset_password_token_created
from django.dispatch import receiver 
from django.urls import reverse 
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags

class UserManager(BaseUserManager): 
    def create_user(self, email, password=None, **extra_fields ): 
        if not email: 
            raise ValueError('Email is a required field')

        if not password:
            raise ValueError('Password is a required field')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
        
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    id_user = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255) 
    phone_number = models.CharField(max_length=255) 
    profile_photo_url = models.TextField(blank=True, null=True)  
    role = models.SmallIntegerField()
    is_active = models.BooleanField(default=True) 
    last_login = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = None  # Heredado de AbstractUser
    date_joined = None
    groups = None
    user_permissions = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        managed = False
        db_table = 'users'
        db_table_comment = 'Table of users'

class Doctors(models.Model):
    id = models.OneToOneField('User', models.DO_NOTHING, primary_key=True, db_column='id')
    created_at = models.DateTimeField(auto_now_add=True)
    profesional_license = models.CharField(blank=True, null=True)
    speciality = models.CharField(blank=True, null=True)
    years_experience = models.SmallIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'doctors'
        db_table_comment = 'table of doctors'

class Patients(models.Model):
    BLOOD_TYPE_CHOICES = [
    ('A+', 'A+'),
    ('A-', 'A-'),
    ('B+', 'B+'),
    ('B-', 'B-'),
    ('AB+', 'AB+'),
    ('AB-', 'AB-'),
    ('O+', 'O+'),
    ('O-', 'O-'),
    ]
    
    GENDER_CHOICES = [
    ('Masculino', 'Masculino'),
    ('Femenino', 'Femenino'),
    ]  

    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(blank=True, null=True)
    last_name = models.CharField(blank=True, null=True)
    birth_date = models.DateTimeField(blank=True, null=True)
    responsable_user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True, choices=GENDER_CHOICES)
    blood_type = models.CharField(max_length=3, blank=True, null=True, choices=BLOOD_TYPE_CHOICES)
    address = models.CharField(blank=True, null=True)
    profile_photo_url = models.CharField(blank=True, null=True)
    dni = models.IntegerField(blank=True, null=True)    
    class Meta:
        managed = False
        db_table = 'patients'
        db_table_comment = 'Table of patients'

class Permissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'permissions'
        db_table_comment = 'table of permissions'

class RolePermissions(models.Model):
    role = models.ForeignKey('Roles', models.DO_NOTHING)
    permissions = models.ForeignKey(Permissions, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'role_permissions'
        unique_together = (('role', 'permissions'),)  # importante para reflejar la PK compuesta

class Roles(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)


    class Meta:
        managed = False
        db_table = 'roles'
        db_table_comment = 'table of roles'

class UserRoles(models.Model):
    user = models.ForeignKey('User', models.DO_NOTHING)
    role = models.ForeignKey(Roles, models.DO_NOTHING)

    class Meta:
        managed = False  # si la tabla ya existe
        db_table = 'user_roles'
        unique_together = (('user', 'role'),)  # importante para reflejar la PK compuesta


@receiver(reset_password_token_created)
def password_reset_token_created(reset_password_token, *args, **kwargs):
    sitelink = "http://localhost:5173/"
    token = "{}".format(reset_password_token.key)
    full_link = str(sitelink)+str("password-reset/")+str(token)

    print(token)
    print(full_link)

    context = {
        'full_link': full_link,
        'email_adress': reset_password_token.user.email
    }

    html_message = render_to_string("backend/email.html", context=context)
    plain_message = strip_tags(html_message)

    msg = EmailMultiAlternatives(
        subject = "Request for resetting password for {title}".format(title=reset_password_token.user.email), 
        body=plain_message,
        from_email = "dentalog_un@proton.me", 
        to=[reset_password_token.user.email]
    )

    msg.attach_alternative(html_message, "text/html")
    msg.send()