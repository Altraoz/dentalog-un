# Imports de terceros
from django.contrib.auth import get_user_model, authenticate
from django.shortcuts import get_object_or_404
from knox.models import AuthToken
from rest_framework import status, viewsets, permissions
from rest_framework.response import Response

# Imports locales
from .models import User, Doctors, Patients, Permissions, Roles
from .serializers import UserSerializer, DoctorsSerializer, PatientsSerializer, PermissionsSerializer, RolesSerializer
User = get_user_model()

class LoginViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def create(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        if not email or not password:
            return Response({"error": "Email and password are required."}, status=400)
        user = authenticate(request, email=email, password=password)
        if user:
            _, token = AuthToken.objects.create(user)
            return Response({
                "user": UserSerializer(user).data,
                "token": token
            })
        else:
            return Response({"error": "Invalid credentials"}, status=401)

class RegisterViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def create(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            _, token = AuthToken.objects.create(user)
            return Response({
                "user": UserSerializer(user).data,
                "token": token
            })
        else:
            return Response(serializer.errors, status=400)


class UserViewset(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        instance = get_object_or_404(User, pk=pk)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def partial_update(self, request, pk=None):
        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class DoctorViewset(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        queryset = Doctors.objects.all()
        serializer = DoctorsSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        doctor = get_object_or_404(Doctors, pk=pk)
        serializer = DoctorsSerializer(doctor)
        return Response(serializer.data)

    def create(self, request):
        serializer = DoctorsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        doctor = get_object_or_404(Doctors, pk=pk)
        serializer = DoctorsSerializer(doctor, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        doctor = get_object_or_404(Doctors, pk=pk)
        doctor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PatientViewset(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        queryset = Patients.objects.all()
        serializer = PatientsSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        patient = get_object_or_404(Patients, pk=pk)
        serializer = PatientsSerializer(patient)
        return Response(serializer.data)

    def create(self, request):
        serializer = PatientsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        patient = get_object_or_404(Patients, pk=pk)
        serializer = PatientsSerializer(patient, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        patient = get_object_or_404(Patients, pk=pk)
        patient.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PermissionsViewset(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        queryset = Permissions.objects.all()
        serializer = PermissionsSerializer(queryset, many=True)
        return Response(serializer.data)
    def create(self, request):
        serializer = PermissionsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    

class RolesViewset(viewsets.ViewSet):

    
    permission_classes = [permissions.IsAuthenticated]
    def list(self, request):
        queryset = Roles.objects.all()
        serializer = RolesSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = RolesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    