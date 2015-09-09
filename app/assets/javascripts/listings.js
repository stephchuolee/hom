
var map;
var marker = [];
function getAddresses(id){
  if (!id){
    id = "";
  }

  $.ajax({
    url: '/listings/'+id,   
    dataType: 'json',
    success: function(data){

      var addresses= extractAddresses(data);
      var geocoder = new google.maps.Geocoder();
      map = new google.maps.Map(document.getElementById('map'), {
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

function geocodeAddress(geocoder, resultsMap, addresses ) {
  // var address = document.getElementById('address').value;
  for (var i =0; i< addresses.length; i++) {
    geocoder.geocode({'address': addresses[i]}, function(results, status) {
      var coord = results[0].geometry.location;
      if (status === google.maps.GeocoderStatus.OK) {
        resultsMap.setCenter(coord);
        map = resultsMap;
        addMarker(coord);   
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}

function addMarker(coord){
  var marker_new = new google.maps.Marker({
    map: map,
    position: coord
  });
  marker.push(marker_new);
}

function recenterMap(id){
  $.ajax({
    url: '/listings/'+id,   
    dataType: 'json',
    success: function(data){
      var address= extractAddresses(data);
      var geocoder = new google.maps.Geocoder(); 
      geocodeAddress(geocoder, map, address);
    }
  });
}


$(function(){
  $('.listingDiv').on('click', function(){
    var id = $(this).data('listing-id');
    recenterMap(id);
    // getAddresses(id);
  })
});



  // function initMap() {
  //   var mapDiv = document.getElementById('map');
  //   var map = new google.maps.Map(mapDiv, {
  //     zoom: 8,
  //     center: new google.maps.LatLng(-34.397, 150.644)
  //   });

  //   // We add a DOM event here to show an alert if the DIV containing the
  //   // map is clicked.
  //   google.maps.event.addDomListener(mapDiv, 'click', function() {
  //     window.alert('Map was clicked!');
  //   });
  // }
