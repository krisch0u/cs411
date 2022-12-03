var user_location = 'boston'
var token = 'Bearer Txw-uhYHT15LsmLZyoLnCVWv5yxA2H1UmJ4jXU2MJCQdTrXyy5ZzxwUc2rXfXDY87ftTvMTjtJjk3VvEDtxD3FoRh04vwBiCTnahFOZ9e2SmZUummNFvvb1-1D1xY3Yx'
var cors_anywhere_url = 'https://cors-anywhere.herokuapp.com/'
var yelp_url = 'https://api.yelp.com/v3/businesses/search'
function clientCallback() {
    console.log('made it to the client callback')
}
var requestobj = {
    'url': cors_anywhere_url + yelp_url,
    'method': 'GET',
    'headers': { 'Authorization': token },
    'data': { 'term': 'food', 'location': user_location },
}
$.ajax(requestobj)
.done(function(response) {
    var list = response.businesses
    // sort list by rating
    list.sort(function(a, b) {
        return b.rating - a.rating
    })
    console.log(list)
})