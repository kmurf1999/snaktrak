from django.contrib import admin
from entries.models import FoodEntry, WeightEntry

admin.site.register(FoodEntry)
admin.site.register(WeightEntry)
