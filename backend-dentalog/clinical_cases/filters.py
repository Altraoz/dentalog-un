from django_filters import rest_framework as filters
from .models import Evolutions

class EvolutionFilter(filters.FilterSet):
    patient = filters.NumberFilter(field_name='appointment__patient')

    class Meta:
        model = Evolutions
        fields = ['id', 'title', 'patient']