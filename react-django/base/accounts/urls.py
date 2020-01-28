from django.urls import path, include, re_path
from .api import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views
from django_rest_passwordreset import views as password_reset_views
from . import views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view(), name='knox_register'),
    path('api/auth/login', LoginAPI.as_view(), name='knox_login'),
    path('api/auth/user', UserAPI.as_view(), name='knox_user'),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/auth/password_reset',
         include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('api/auth/password_reset/confirm',
         password_reset_views.ResetPasswordConfirm.as_view()),
    re_path(r'^.*/', views.index)
]
