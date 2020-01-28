
import csv
import os

from django.db import connection, models
from django.shortcuts import get_object_or_404
from rest_framework import filters, permissions, status, viewsets
from rest_framework.parsers import (FileUploadParser, JSONParser,
                                    MultiPartParser)
from rest_framework.response import Response

from backend.models import (
    Allocations, Category, Group, Product, Subcategory, Type, User, Review)

from .serializers import (AllocationSerializer, BackendSerializer,
                          CategorySerializer, GroupSerializer,
                          ProductSerializer, SubcategorySerializer,
                          TypeSerializer, ReviewSerializer)

# Backend Viewset

"""
A ViewSet is part of the REST framework that allows you to combine logic for related views in a single class.
Useful for SQL queries, I think
- Alex
"""


class IsAuthenticatedAndOwnerOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return ((obj == request.user) and ('is_admin' not in request.data)) or (request.user.is_staff and request.user.is_admin)


class UsersViewSet(viewsets.ModelViewSet):
    serializer_class = BackendSerializer
    permission_classes = [IsAuthenticatedAndOwnerOrAdmin]

    def get_queryset(self):
        return User.objects.all()

    def perform_create(self, serializer):
        serializer.save()

    def update(self, request, pk=None):
        instance = get_object_or_404(User, id=pk)
        if request.data['group'] is not None:
            group = get_object_or_404(Group, id=request.data['group'])
            instance.group = group

        instance.email = request.data['email']
        instance.institute = request.data['institute']
        instance.contact_number = request.data['contact_number']
        instance.institute_size = request.data['institute_size']
        instance.address = request.data['address']
        instance.suburb = request.data['suburb']
        instance.postcode = request.data['postcode']

        instance.save()
        serializer = BackendSerializer(instance, many=False)
        return Response(serializer.data)


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    parser_classes = [MultiPartParser, JSONParser, FileUploadParser]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description', 'type__name',
                     'category__name', 'subcategory_name', 'price', 'brand', 'quantity']
    permission_classes = [permissions.IsAdminUser]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.IsAdminUser]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        return Product.objects.select_related().all()

    def perform_create(self, serializer):
        serializer.save()

    def destroy(self, request, pk=None):
        instance = get_object_or_404(Product, id=pk)
        instance.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

    def create(self, request):
        category = Category.objects.get_or_create(
            name=request.data['category'])
        subcategory = Subcategory.objects.get_or_create(
            name=request.data['subcategory'])
        instance = Product(
            name=request.data['name'], description=request.data['description'],
            category=category[0], subcategory=subcategory[0], price=request.data['price'], brand=request.data['brand'],
            quantity=request.data['quantity'], picture=request.data['picture'], documentation=request.data['documentation'])
        instance.save()
        for type_name in request.data['type'].split(","):
            type = Type.objects.get_or_create(name=type_name)
            instance.type.add(type[0])
        serializer = ProductSerializer(instance, many=False)

        return Response(serializer.data)

    def update(self, request, pk=None):
        instance = get_object_or_404(Product, id=pk)
        if request.data['category'] is '':
            pass
        else:
            category = get_object_or_404(Category, id=request.data['category'])
            instance.category = category
        if request.data['subcategory'] in {'null', '', '0', None}:
            instance.subcategory = None
        else:
            subcategory = get_object_or_404(
                Subcategory, id=request.data['subcategory'])
            instance.subcategory = subcategory
        instance.name = request.data['name']
        instance.description = request.data['description']
        instance.price = request.data['price']
        instance.brand = request.data['brand']
        instance.quantity = request.data['quantity']
        instance.picture = request.data['picture']
        instance.documentation = request.data['documentation']

        instance.save()

        instance.type.clear()
        for type_name in request.data['type'].split(","):
            type = Type.objects.get_or_create(name=type_name)
            instance.type.add(type[0])
        serializer = ProductSerializer(instance, many=False)

        return Response(serializer.data)


class MultiProductViewSet(viewsets.ModelViewSet):
    parser_classses = (MultiPartParser,)
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def create(self, request):
        file = request.FILES['csv']

        destination = open('batch.csv', 'wb')
        for chunk in file.chunks():
            destination.write(chunk)
        destination.close()
        products = []

        with open('batch.csv', "r") as file:
            csv_reader = csv.reader(file, delimiter=',')

            for line in csv_reader:
                category = Category.objects.get_or_create(name=line[2])
                types = [Type.objects.get_or_create(name=name) for name in line[3].split("|")]

                try:

                    product = Product(name=line[0], description=line[1],
                                      category=category[0], price=line[4], brand=line[5], quantity=line[6])

                    product.save()
                    for type in types:
                        product.type.add(type[0])
                    products.append(product)
                except:
                    if category[1]:
                        category[0].delete()
                    for type in types:
                        if type[1]:
                            type[0].delete()
                    continue

        os.remove('batch.csv')
        serializer = ProductSerializer(
            products, context={'request': request},  many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        return serializer.save()

class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer

    def get_permissions(self):
        if self.action == 'list' or self.action == 'create':
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.IsAdminUser]

        return [permission() for permission in permission_classes]

    def create(self, request):
        author = self.request.user
        product = get_object_or_404(Product, name=request.data['product'])
        instance = Review(
            title=request.data['title'], comment=request.data['comment'],
            rating=request.data['rating'], product=product,
            author=author)
        instance.save()
        serializer = ReviewSerializer(instance, many=False)

        return Response(serializer.data)

    def get_queryset(self):
        print(self.request)
        return Review.objects.all()

    def list(self, request):
        queryset = Review.objects.all()
        serializer = ReviewSerializer(queryset, many=True)

        return Response(serializer.data)

    def destroy(self, request, pk=None):
        instance = get_object_or_404(Review, id=pk)
        instance.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_create(self, serializer):
        serializer.save()

class TypeViewSet(viewsets.ModelViewSet):
    serializer_class = TypeSerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.IsAdminUser]

        return [permission() for permission in permission_classes]

    def list(self, request):
        queryset = Type.objects.all()
        serializer = TypeSerializer(queryset, many=True)

        return Response(serializer.data)

    def destroy(self, request, pk=None):
        instance = get_object_or_404(Type, id=pk)
        instance.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, pk=None):
        instance = get_object_or_404(Type, id=pk)
        instance.name = request.data['name']
        instance.save()
        serializer = TypeSerializer(instance, many=False)

        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save()


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.IsAdminUser]

        return [permission() for permission in permission_classes]

    def list(self, request):
        queryset = Category.objects.all()
        serializer = CategorySerializer(queryset, many=True)

        return Response(serializer.data)

    def destroy(self, request, pk=None):
        instance = get_object_or_404(Category, id=pk)
        try:
            instance.delete()
        except models.ProtectedError:
            return Response({"in_use": "Cannot delete category: in use"}, status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, pk=None):
        instance = get_object_or_404(Category, id=pk)
        instance.name = request.data['name']
        instance.save()
        serializer = CategorySerializer(instance, many=False)

        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save()


class SubcategoryViewSet(viewsets.ModelViewSet):

    serializer_class = SubcategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):

        if self.action == 'list':
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.IsAdminUser]

        return [permission() for permission in permission_classes]

    def dictfetchall(self, cursor):
        "Returns all rows from a cursor as a dict"
        desc = cursor.description
        return [
            dict(zip([col[0] for col in desc], row))
            for row in cursor.fetchall()
        ]

    def list(self, request):
        queryset = Subcategory.objects.all()
        serializer = SubcategorySerializer(queryset, many=True)

        return Response(serializer.data)

    def get_queryset(self):
        # cate = Category.objects.all()
        # for e in cate:
        #     return e.subcategory_set.all()

        # return cate.subcategory_set.objects.all()
        return Subcategory.objects.select_related().all()
        # # pubs = Subcategory.objects.select_related('parent_category')

    # # print (str(pubs.query))
        # with connection.cursor() as cursor:
        # #     # cursor.execute(str(pubs.query))
        #     cursor.execute("SELECT backend_category.name FROM backend_subcategory OUTER JOIN backend_category ON backend_subcategory.parent_category_id = backend_category.id")
        # #     # cursor.execute("SELECT * FROM backend_subcategory")
        # #     # row = cursor.fetchone()
        #     row = SubcategoryViewSet.dictfetchall(cursor)

        # return row

    def create(self, request):          # passed product is stored in request

        category = get_object_or_404(Category, id=request.data['category'])
        instance = Subcategory(
            name=request.data['name'], parent_category=category)
        instance.save()
        serializer = SubcategorySerializer(instance, many=False)

        return Response(serializer.data)

    def update(self, request, pk=None):
        instance = get_object_or_404(Subcategory, id=pk)
        instance.name = request.data['name']

        instance.save()
        serializer = SubcategorySerializer(instance, many=False)

        return Response(serializer.data)

    def destroy(self, request, pk=None):
        instance = get_object_or_404(Subcategory, id=pk)
        instance.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class AllocationViewSet(viewsets.ModelViewSet):
    serializer_class = AllocationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Allocations.objects.all()
        return Allocations.objects.select_related(
            'user').filter(user_id=self.request.user.id)

    def create(self, request):
        quantity = int(request.data['quantity'])
        if request.data['type'] is 0:
            user = get_object_or_404(User, pk=request.data['user'])
            instance = Allocations(
                user=user, quantity=request.data['quantity'], message=request.data['message'])
            instance.save()

            for product_id in request.data['product']:
                product = get_object_or_404(Product, pk=product_id)

                if quantity > product.quantity:
                    instance.delete()
                    # print("QUANT ", request.data['quantity'], "(",quantity, ")", " what we have ", product.quantity)
                    return Response(status=status.HTTP_400_BAD_REQUEST)

                instance.products.add(product)
                product.quantity -= quantity
                product.save()
            serializer = AllocationSerializer(instance, many=False)

            return Response(serializer.data)

        elif request.data['type'] is 1:
            users = User.objects.all().filter(group=request.data['group'])
            instances = []

            for user in users:
                instance = Allocations(
                    user=user, quantity=request.data['quantity'], message=request.data['message'])
                instance.save()

                for product_id in request.data['product']:
                    product = get_object_or_404(Product, pk=product_id)

                    if quantity > product.quantity:
                        instance.delete()
                        return Response(status=status.HTTP_400_BAD_REQUEST)

                    instance.products.add(product)
                    product.quantity -= quantity
                    product.save()
                    instances.append(instance)
            serializer = AllocationSerializer(instances, many=True)

            return Response(serializer.data)

        return Response(status=status.HTTP_204_NO_CONTENT)

    def destroy(self, request, pk=None):
        instance = get_object_or_404(Allocations, id=pk)
        products = instance.products.all()
        for product in products:
            product.quantity += instance.quantity
            product.save()
        instance.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, pk=None):
        print('request contains ', request.data['products'])
        instance = get_object_or_404(Allocations, id=pk)
        user = get_object_or_404(User, id=request.data['user'])
        quantity = int(request.data['quantity'])
        if request.data['message'] is not None:
            message = request.data['message']
            instance.message = message
        instance.user = user
        instance.quantity = quantity
        instance.save()
        instance.products.clear()

        for product_id in request.data['products']:
            print('Product id is ', product_id)
            product = get_object_or_404(Product, pk=product_id["id"])
            if quantity != instance.quantity:
                if quantity > instance.quantity:
                    if quantity > product.quantity:
                        return Response(status=status.HTTP_400_BAD_REQUEST)
                    else:
                        product.quantity -= quantity
                else:
                    product.quantity += quantity
            instance.products.add(product)
            product.save()

        serializer = AllocationSerializer(instance, many=False)

        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save()


class GroupViewSet(viewsets.ModelViewSet):
    serializer_class = GroupSerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.IsAdminUser]

        return [permission() for permission in permission_classes]

    def list(self, request):
        queryset = Group.objects.all()
        serializer = GroupSerializer(queryset, many=True)

        return Response(serializer.data)

    def destroy(self, request, pk=None):
        instance = get_object_or_404(Group, id=pk)
        instance.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, pk=None):
        instance = get_object_or_404(Group, id=pk)
        instance.name = request.data['name']
        instance.save()
        serializer = GroupSerializer(instance, many=False)

        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save()
