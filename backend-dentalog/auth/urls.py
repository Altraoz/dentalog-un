from django.contrib import admin
from django.urls import path, include
from knox import views as knox_views
from django.http import HttpResponse


urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/',include('users.urls')), 
    #path('api/auth/',include('knox.urls')), 
    path('clinical/', include('clinical_cases.urls')),

    path('logout/',knox_views.LogoutView.as_view(), name='knox_logout'), 
    path('logoutall/',knox_views.LogoutAllView.as_view(), name='knox_logoutall'), 
    path('api/password_reset/',include('django_rest_passwordreset.urls', namespace='password_reset')),

    path('', lambda request: HttpResponse(status=200)),

]
