from rest_framework import serializers
from .models import User, Doctors, Patients, Permissions, Roles, RolePermissions, UserRoles

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id_user', 'created_at', 'first_name', 'last_name', 'phone_number',
            'profile_photo_url', 'role', 'is_active', 'last_login', 'updated_at', 'email', 'password'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'last_login': {'read_only': True},
            'updated_at': {'read_only': True},
            'created_at': {'read_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            phone_number=validated_data.get('phone_number', ''),
            profile_photo_url=validated_data.get('profile_photo_url', ''),
            role=validated_data['role'],
            is_active=validated_data.get('is_active', True)
        )
        return user

from rest_framework import serializers
from .models import User, Doctors, Patients, Permissions, Roles, RolePermissions, UserRoles

class DoctorsSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='id',  # Maps to the 'id' field in the Doctors model
        required=False
    )
    user_data = UserSerializer(required=False, write_only=True)  # Optional nested user data for creating a new user

    class Meta:
        model = Doctors
        fields = ['id', 'created_at', 'profesional_license', 'speciality', 'years_experience', 'user', 'user_data']
        extra_kwargs = {
            'id': {'read_only': True},  # id is set to the user's id
            'created_at': {'read_only': True}
        }

    def create(self, validated_data):
        user_data = validated_data.pop('user_data', None)
        user = validated_data.pop('id', None)  # Get the user instance from PrimaryKeyRelatedField

        if user_data and not user:
            # Create a new user if user_data is provided
            user = User.objects.create_user(**user_data)
        elif not user:
            raise serializers.ValidationError({"user": "Either 'user' (user_id) or 'user_data' is required."})

        # Create the doctor with the user as the id
        doctor = Doctors.objects.create(id=user, **validated_data)
        return doctor

    def to_representation(self, instance):
        # Include full user details in the response
        representation = super().to_representation(instance)
        representation['user'] = UserSerializer(instance.id).data
        representation.pop('user_data', None)  # Remove user_data from response
        return representation

class PatientsSerializer(serializers.ModelSerializer):
    responsable_user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        required=False,
        allow_null=True
    )
    responsable_user_data = UserSerializer(
        required=False,
        allow_null=True,
        write_only=True
    )  # Para datos anidados opcionales para crear un nuevo usuario

    class Meta:
        model = Patients
        fields = [
            'id', 'created_at', 'first_name', 'last_name', 'birth_date', 'responsable_user',
            'responsable_user_data', 'gender', 'blood_type', 'insurance_provider', 'address',
            'profile_photo_url'
        ]
        extra_kwargs = {
            'id': {'read_only': True},
            'created_at': {'read_only': True}
        }

    def create(self, validated_data):
        # Extraer datos
        responsable_user_data = validated_data.pop('responsable_user_data', None)
        responsable_user = validated_data.pop('responsable_user', None)

        # Si se proporcionó responsable_user_data y no un responsable_user, crear un nuevo usuario
        if responsable_user_data and not responsable_user:
            responsable_user = User.objects.create_user(**responsable_user_data)

        # Si no hay responsable_user ni responsable_user_data, se permite que sea None (ya que allow_null=True)
        validated_data['responsable_user'] = responsable_user

        # Crear el paciente
        patient = Patients.objects.create(**validated_data)
        return patient

    def to_representation(self, instance):
        # Incluir detalles completos del usuario en la respuesta
        representation = super().to_representation(instance)
        if instance.responsable_user:
            representation['responsable_user'] = UserSerializer(instance.responsable_user).data
        else:
            representation['responsable_user'] = None
        representation.pop('responsable_user_data', None)  # Eliminar responsable_user_data de la respuesta
        return representation

class PermissionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permissions
        fields = ['id', 'created_at', 'name', 'description']

class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = ['id', 'created_at', 'name', 'description']

class RolePermissionsSerializer(serializers.ModelSerializer):
    role = RolesSerializer()
    permissions = PermissionsSerializer()

    class Meta:
        model = RolePermissions
        fields = ['role', 'permissions']

class UserRolesSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    role = RolesSerializer()

    class Meta:
        model = UserRoles
        fields = ['user', 'role']