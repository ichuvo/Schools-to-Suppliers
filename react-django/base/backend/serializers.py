from rest_framework import serializers

from backend.models import User, Product, Review, Type, Category, Allocations, Subcategory, Group


# Backend Serializer

"""
Serialisers allow data such as query returns etc to be converted to native python datatypes
E.G., this takes the user stuff and just yeets all the fields into dict (I think)
- Alex
"""


class BackendSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'institute', 'contact_number', 'institute_size', 'address', 'suburb', 'postcode',
                  'is_admin', 'last_login', 'created_at', 'group')
        depth = 1


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        depth = 1


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.SerializerMethodField('get_subcategories')

    class Meta:
        model = Category
        fields = ['id', 'name', 'subcategories']

    def get_subcategories(self, category):
        subcate = category.subcategory_set.all()
        name_list = SubcategorySerializer(subcate, many=True)
        return name_list.data

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = '__all__'  # ('id', 'name', 'parent_category_id')  #'__all__'
        depth = 1


class AllocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Allocations
        fields = '__all__'
        depth = 1  # Look into the table to retrieve the relevant details


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'
