from rest_framework import serializers

from accounts.models import User
from lib.utils import validate_email as email_is_valid

from entries.serializers import FoodEntrySerializer, WeightEntrySerializer

class UserSerializer(serializers.ModelSerializer):
    food_entries = FoodEntrySerializer(many=True, read_only=True)
    weight_entries = WeightEntrySerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = (
                'id', 'phone_number', 'username',
                'start_weight', 'current_weight', 'target_weight',
                'target_calories', 'target_carbohydrate', 'target_protein', 'target_fat',
                'food_entries', 'weight_entries'
                )


from accounts.utils import sendSMS
class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'phone_number', 'password')

    def create(self, validated_data):
        """
        Create the object.
        :param validated_data: string
        """
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        sendSMS(user.phone_number, user.phone_validation_key)
        return user

    def validate_phone_number(self, value):
        if User.objects.filter(phone_number=value).exists():
            raise serializers.ValidationError('Phone Number already in use')

        return value

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('Username already in use')

        return value
