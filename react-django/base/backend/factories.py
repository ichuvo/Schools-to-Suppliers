import factory
from django.contrib.auth.hashers import*
from .models import UserManager, User, Product


class UserF(factory.django.DjangoModelFactory):
    class Meta:
        model = User

   #  email = factory.Faker("ascii_free_email")
    email = "test@gmail.com"
    password = make_password('')
    #is_active = True
    is_admin = True
    is_staff = True
