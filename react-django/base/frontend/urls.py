from django.urls import path
from . import views

"""
no touchy touchy
This is what overrides Django and begins the routing to React.
- Alex
"""

urlpatterns = [
    path('', views.index)
]
