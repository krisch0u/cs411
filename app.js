
var token = 'Bearer Txw-uhYHT15LsmLZyoLnCVWv5yxA2H1UmJ4jXU2MJCQdTrXyy5ZzxwUc2rXfXDY87ftTvMTjtJjk3VvEDtxD3FoRh04vwBiCTnahFOZ9e2SmZUummNFvvb1-1D1xY3Yx'
        var cors_anywhere_url = 'https://cors-anywhere.herokuapp.com/'
        var yelp_url = 'https://api.yelp.com/v3/businesses/search?term=restaurants&location=San+Francisco'
        function clientCallback() {
            console.log('made it to the client callback')
        }
        var requestobj = {
            'url': cors_anywhere_url + yelp_url,
            'method': 'GET',
            headers : {'Authorization': token},
            error: function (jqXHR, textstatus, errorThrown) {
                console.log('AJAX error, jqXHR = ', jqXHR, 'textstatus = ', textstatus, 'errorThrown = ', errorThrown)
            }
        }
        $.ajax(requestobj)
        .done(function(response) {
            console.log('typeof response = ', typeof response)
            console.log('response = ', response)
        })