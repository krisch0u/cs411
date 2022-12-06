import requests
import json
from nutritionix import Nutritionix
nix = Nutritionix(app_id="33739447",api_key="095129f2259c6315a635a5f891ef0e1a")
user_location = 'Boston'
menu_item = 'pizza'
API_KEY = 'Txw-uhYHT15LsmLZyoLnCVWv5yxA2H1UmJ4jXU2MJCQdTrXyy5ZzxwUc2rXfXDY87ftTvMTjtJjk3VvEDtxD3FoRh04vwBiCTnahFOZ9e2SmZUummNFvvb1-1D1xY3Yx'
Endpoint = 'https://api.yelp.com/v3/businesses/search'
Headers = {'Authorization': 'Bearer %s' % API_KEY}
Parameters = {'term': 'restaurant', 'location': user_location}
response = requests.get(url = Endpoint, params = Parameters, headers = Headers)
business_data = response.json()
food = nix.search(menu_item).json()
food_id = []
for i in range(len(food['hits'])):
    food_id.append(food['hits'][i]['fields']['item_id'])

food_final = []
for i in range(len(food_id)):
    food_final.append(nix.item(id=food_id[i]).json())

with open('res.json', 'w') as outfile:
    for i in business_data['businesses']:
        if i['is_closed'] == True:
            business_data['businesses'].remove(i)
    json.dump(business_data, outfile)
  
    outfile.close()

with open('food.json', 'w') as outfile:
    json.dump(food_final, outfile)
  
    outfile.close()


#open food.json file and print name of food
        
with open('res.json', 'r') as infile:
    data = json.load(infile)
    data['businesses'].sort(key=lambda x: x['rating'], reverse=True)
  
    infile.close()