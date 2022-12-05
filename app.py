import requests
from nutritionix import Nutritionix
nix = Nutritionix(app_id="33739447",api_key="095129f2259c6315a635a5f891ef0e1a")
user_location = 'boston'
menu_item = 'pizza'
API_KEY = 'Txw-uhYHT15LsmLZyoLnCVWv5yxA2H1UmJ4jXU2MJCQdTrXyy5ZzxwUc2rXfXDY87ftTvMTjtJjk3VvEDtxD3FoRh04vwBiCTnahFOZ9e2SmZUummNFvvb1-1D1xY3Yx'
Endpoint = 'https://api.yelp.com/v3/businesses/search'
Headers = {'Authorization': 'Bearer %s' % API_KEY}
Parameters = {'term': 'restaurant', 'location': user_location, 'limit': 50}
response = requests.get(url = Endpoint, params = Parameters, headers = Headers)
business_data = response.json()
business_data['businesses'].sort(key=lambda x: x['rating'], reverse=True)
for business in business_data['businesses']:
    print(business['name'], business['rating'])
print(nix.search(menu_item, results="0:1", fields=["item_name", "brand_name", "nf_calories", "nf_total_fat"]).json())
