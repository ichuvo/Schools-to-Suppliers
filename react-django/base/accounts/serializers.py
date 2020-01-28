from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
User = get_user_model()

# When you make a model, make sure you add the relevant fields here


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'institute', 'contact_number',
                  'institute_size', 'address', 'suburb', 'postcode', 'is_admin', 'created_at', 'group')
        depth = 1


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}
        depth = 1

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['email'], validated_data['password'],
            validated_data['institute'], validated_data['contact_number'],
            validated_data['institute_size'], validated_data['address'],
            validated_data['suburb'], validated_data['postcode'], validated_data['group'])

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
