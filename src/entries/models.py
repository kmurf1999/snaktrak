from django.db import models
from django.utils import timezone
from datetime import datetime, timedelta
from accounts.models import User

# Create your models here.

class FoodEntryManager(models.Manager):
	"""
		Creates an Entry object in the database given a JSON string and a User object
		The JSON string MUST contain all of the below keys
	"""
	def create_entry(self, nutrition, user):
		total_carbohydrate = nutrition['total_carbohydrate']
		serving_unit = nutrition['serving_unit']
		total_protein =  nutrition['total_protein']
		total_calories = nutrition['total_calories']
		total_fat =  nutrition['total_fat']
		serving_qty =  nutrition['serving_qty']
		food_name =  nutrition['food_name']
		food_entry = self.create(user=user,
					total_carbohydrate=total_carbohydrate,
					serving_unit=serving_unit,
					total_calories=total_calories,
					total_fat=total_fat,
					total_protein=total_protein,
					serving_qty=serving_qty,
					food_name=food_name)
		food_entry.save()


class FoodEntry(models.Model):
	"""
	A Model for foods with ForeignKey to User Object
	"""
	objects = FoodEntryManager()

	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="food_entries")
	pub_date = models.DateTimeField(default=timezone.now)
	total_carbohydrate = models.FloatField()
	serving_unit = models.CharField(max_length=40)
	total_protein = models.FloatField()
	total_calories = models.FloatField()
	total_fat = models.FloatField()
	serving_qty = models.IntegerField()
	food_name = models.CharField(max_length=40)

	class Meta:
		ordering = ('pub_date',)

	def __str__(self):
		return "food entry for %s" % self.user


class WeightEntryManager(models.Manager):
	"""
		Creates an Entry object in the database given a JSON string and a User object
		The JSON string MUST contain all of the below keys
	"""
	def create_entry(self, weight, user):
		user.current_weight = weight
		user.save()
		weight_entry = self.create(user=user,
					weight=weight)
		weight_entry.save()


class WeightEntry(models.Model):
	"""
	A Model for foods with ForeignKey to User Object
	"""
	objects = WeightEntryManager()

	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="weight_entries")
	pub_date = models.DateTimeField(default=timezone.now)
	weight = models.FloatField()

	class Meta:
		ordering = ('pub_date',)

	def __str__(self):
		return "weight entry for %s" % self.user
