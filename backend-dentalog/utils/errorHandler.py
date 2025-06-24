from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
from django.db import IntegrityError
import traceback

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        return Response({
            'error': True,
            'status_code': response.status_code,
            'type': type(exc).__name__,
            'detail': response.data.get('detail', str(exc))
        }, status=response.status_code)

    # Tratar IntegrityError como 400
    if isinstance(exc, IntegrityError):
        return Response({
            'error': True,
            'status_code': 400,
            'type': type(exc).__name__,
            'detail': str(exc),
            'trace': traceback.format_exc()
        }, status=status.HTTP_400_BAD_REQUEST)

    # Cualquier otro error no manejado: 500
    return Response({
        'error': True,
        'status_code': 500,
        'type': type(exc).__name__,
        'detail': str(exc),
        'trace': traceback.format_exc()
    }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
