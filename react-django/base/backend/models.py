from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
# Create your models here.

"""
Used for Django to create the database. Self explanatory.
- Alex
"""


class Group(models.Model):
    name = models.CharField(max_length=60)

    def __str__(self):
        return self.name


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, institute=None, contact_number=None, institute_size=None, address=None, suburb=None, postcode=None, group=None):
        if not email:
            raise ValueError("Users must have an email address")

        grp = Group.objects.get_or_create(name=group)
        user = self.model(
            email=self.normalize_email(email),
            institute=institute,
            contact_number=contact_number,
            institute_size=institute_size,
            address=address,
            suburb=suburb,
            postcode=postcode,
            group = grp[0]
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password, group="admin")
        user.is_admin = True
        user.is_staff = True
        user.save(using=self._db)

    def authenticate(self, email=None, password=None):
        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                return user
        except:
            return None


class User(AbstractBaseUser):
    email = models.EmailField(max_length=100, unique=True)
    institute = models.CharField(max_length=100, null=True)
    created_at = models.DateField(auto_now_add=True)
    # Note auto_now_add, automatically adds the date of submission
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    # Additional Fields suggested by client - Alicia
    contact_number = models.CharField(max_length=10, null=True)
    address = models.CharField(max_length=100, null=True)
    suburb = models.CharField(max_length=50, null=True)
    postcode = models.CharField(max_length=4, null=True)
    # Number of students - should be size range with a dropdown
    institute_size = models.CharField(max_length=20, null=True)
    group = models.ForeignKey(
        Group, blank=True, null=True, on_delete=models.SET_NULL)

    # location = models.IntegerField(null=True) # May or may not be zipcode

    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

# category e.g 'Maths'


class Category(models.Model):
    name = models.CharField(max_length=60, unique=True)

    def __str__(self):
        return self.name

# type e.g 'Textbook'

# Subcategory model


class Subcategory(models.Model):
    name = models.CharField(max_length=60, unique=True)
    parent_category = models.ForeignKey(
        Category, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Type(models.Model):
    name = models.CharField(max_length=60, unique=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    category = models.ForeignKey(
        Category, null=True, on_delete=models.PROTECT)
    subcategory = models.ForeignKey(
        Subcategory, null=True, on_delete=models.SET_NULL)
    type = models.ManyToManyField('Type', related_name='ProductType')
    picture = models.ImageField(
        upload_to='picture', default="", blank=True, max_length=500)
    documentation = models.FileField(
        upload_to='documentation', blank=True, default="", max_length=500)

    price = models.DecimalField(
        max_digits=6, decimal_places=2, null=True)  # Money field
    quantity = models.IntegerField(null=True)  # Stock of product
    brand = models.TextField(max_length=100, null=True)
    
    def __str__(self):
        return self.name


class Review(models.Model):
    title = models.CharField(max_length=100)
    comment = models.TextField()
    rating = models.IntegerField()
    author = models.ForeignKey(
        User, null=True, on_delete=models.SET_NULL)
    product = models.ForeignKey(
    Product, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.title


class Allocations(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    products = models.ManyToManyField(
        'Product', related_name='UserProductAllocations')
    created_at = models.DateField(auto_now_add=True)
    quantity = models.IntegerField(null=True)
    message = models.TextField(null=True)

    def __str__(self):
        return self.user.email
