function getAddresses(id){
  if (!id){
    id = "";
  }

  $.ajax({
    url: '/listings/'+id, // 
    dataType: 'json',
    success: function(data){

      var addresses= extractAddresses(data);
      var geocoder = new google.maps.Geocoder();
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
      }); 
      geocodeAddress(geocoder, map, addresses);
    }
  });
}

function extractAddresses(data) {
  var addresses = [];
  if( data.length){
    for(var i=0; i< data.length; i++) {
      addresses.push(data[i].address);
    }
  } else {
    addresses.push(data.address);
  }
  
  return addresses;
}

function initMap() {
  var id = $('#map').data('listing-id');
  // var id = document.getElementById('map').getAttribute("data-listing-id");
  getAddresses(id);
}

function geocodeAddress(geocoder, resultsMap, addresses) {
  // var address = document.getElementById('address').value;
  for (var i =0; i< addresses.length; i++) {
    geocoder.geocode({'address': addresses[i]}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}



