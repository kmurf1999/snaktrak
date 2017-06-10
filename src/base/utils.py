import requests
from snaktrak.settings.base import NUTRITIONIX_APP_ID, NUTRITIONIX_APP_KEY

def get_nutrition(query):
	url = 'https://trackapi.nutritionix.com/v2/natural/nutrients'

	headers = {
		"Content-Type":"application/json",
		"x-app-id": NUTRITIONIX_APP_ID,
		"x-app-key": NUTRITIONIX_APP_KEY,
	}

	body = {
		"query": query,
		"timezone": "US/Eastern",
	}

	r = requests.post(url, headers=headers, json=body)
	entries = []
	try:
		for food in r.json()['foods']:
			entry = {
				'serving_unit':food['serving_unit'],
				'serving_qty':food['serving_qty'],
				'total_fat':food['nf_total_fat'],
				'total_protein':food['nf_protein'],
				'total_carbohydrate':food['nf_total_carbohydrate'],
				'total_calories':food['nf_calories'],
				'food_name':food['food_name'],
			}

			entries.append(entry)

	except KeyError:
		return "We didn't catch that, please try to re-word your entry"
	except e:
		return 'unknown error'

	return entries
