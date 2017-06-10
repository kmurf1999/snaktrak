from rest_framework import serializers
from entries.models import FoodEntry, WeightEntry

class FoodEntrySerializer(serializers.ModelSerializer):
    """Converts Entry models to JSON"""
    user = serializers.StringRelatedField(many=False)
    class Meta:
        model = FoodEntry
        fields = (
                    'user', 'pub_date','food_name', 'total_calories','serving_unit',
                    'total_protein','total_carbohydrate', 'total_fat','serving_qty', 'id')


class WeightEntrySerializer(serializers.ModelSerializer):
    """Converts WeightEntry models to JSON"""
    user = serializers.StringRelatedField(many=False)
    class Meta:
        model = WeightEntry
        fields = (
                    'user', 'pub_date', 'weight', 'id')
