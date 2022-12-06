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
#business_data['businesses'].sort(key=lambda x: x['rating'], reverse=True)
with open('res.json', 'w') as outfile:
    json.dump(business_data, outfile)
    outfile.close()

with open('food.json', 'w') as outfile:
    json.dump(food, outfile)
    outfile.close()

#read and find restaurants from the same city as the user
with open('res.json', 'r') as infile:
    data = json.load(infile)
    for i in data['businesses']:
        if i['location']['city'] == user_location:
            print(i['name'], i['rating'])

    infile.close()

#read and find food from the same city as the user
with open('food.json', 'r') as infile:
    data = json.load(infile)
    for i in data['hits']:
        print(i['fields']['item_name'])

    infile.close()
        
#find restaurant in the same city as the user with the highest rating and put into a list
with open('res.json', 'r') as infile:
    data = json.load(infile)
    data['businesses'].sort(key=lambda x: x['rating'], reverse=True)
    for i in data['businesses']:
        if i['location']['city'] == user_location and i['is_closed'] == False:
            print(i['name'], i['rating'])
            print(i['location']['address1'])
            print(i['phone'])
            print(i['url'])
            print(i['categories'][0]['title'])
            print(i['review_count'])
            print(i['transactions'])

            infile.close()