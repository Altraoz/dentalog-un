from rest_framework import filters
from django.db.models import Func
from django.db.models import Q
from django.db.models.functions import Lower
from django.db.models import Q, CharField, F




class Unaccent(Func):
    function = 'unaccent'
    template = "%(function)s(%(expressions)s)"


class PatientSearchFilter(filters.SearchFilter):
    search_param = 'q' 

    def filter_queryset(self, request, queryset, view):
        search_terms = self.get_search_terms(request)
        print("Términos de búsqueda:", search_terms)  # 👈 prueba visible en la terminal

        if not search_terms:
            return queryset

        search_fields = self.get_search_fields(view, request)

        for field in search_fields:
            queryset = queryset.annotate(**{
                f'unaccented_{field}': Unaccent(Lower(F(field)))
            })

        # for term in search_terms:
        #     or_query = Q()
        #     for field in search_fields:
        #         or_query |= Q(**{f"{field}__icontains": term})
        #     queryset = queryset.filter(or_query)
        # return queryset
    

        for field in search_fields:
            queryset = queryset.annotate(**{
                f'unaccented_{field}': Unaccent(Lower(F(field)))
            })

        for term in search_terms:
            term = term.lower()  # también lo pasamos a minúscula
            or_query = Q()
            for field in search_fields:
                or_query |= Q(**{f'unaccented_{field}__icontains': term})
            queryset = queryset.filter(or_query)

        return queryset
