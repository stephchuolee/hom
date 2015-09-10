

var map;
var markers = [];
var infoWindow;
var service;


function initMap() {
  var id = $('#map').data('listing-id');
  infoWindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
      }); 
  getAddresses(id);
  importFoursquare();
}


function getAddresses(id){
  var address = extractAddresses();
  var geocoder = new google.maps.Geocoder();
  geocodeAddress(geocoder, address);
} 
  
function extractAddresses(){
  var addresses = [];
  var add = $('.address');
  for (var i =0; i < add.length; i++){
      addresses.push($($('.address')[i]).html());
  }
  return addresses;
}

function geocodeAddress(geocoder, addresses ) {
  var coords= [];
  for (var i =0; i< addresses.length; i++) {
    geocoder.geocode({'address': addresses[i]}, function(results, status) {
      var coord = results[0].geometry.location;
      coords.push(coord);
      if (status === google.maps.GeocoderStatus.OK) {
        map.setCenter(coord);
        // map = resultsMap;
        addMarker(coord);   
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
  return coords;
}

function addMarker(coord){
  var marker_new = new google.maps.Marker({
    map: map,
    position: coord
  });
  markers.push(marker_new);
}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function deleteMarkers() {
  setMapOnAll(null);
  markers = [];
}

function importFoursquare(){
  
  var address = $('li').find('.address').html();
  var geocoder = new google.maps.Geocoder(); 
  geocoder.geocode({'address': address}, function(results, status) {
    var coord = results[0].geometry.location;
    // this ajax request requires authentication info from foursquare such as client_id and client_secret
    // $.ajax({
    //   url: 'https://api.foursquare.com/v2/venues/explore?ll='+ coord["G"].toFixed(3) +","+coord["K"].toFixed(3)
    //   + "&client_id=?????????&client_secret=????????&v=20150910",
    //   dataType: 'json',
    //   success: function(data){
    //     console.log(data);
    //   }
    // });
  });    
}

$(function(){

  $('.listingDiv').on('click', function(){
    var id = $(this).data('listing-id');
    var address = [$(this).find('.address').html()];
    var geocoder = new google.maps.Geocoder();
    geocodeAddress(geocoder, address);
  })

  $('#filter_form').on('submit', function(event){
    event.preventDefault;
    var city = $('#city').val();
    var input = $(this).serialize();
    
    $.ajax({
      url: '/listings/results?' + input, 
      dataType: "json", 
      success: function(data, status){
        deleteMarkers();
        var add = [];
        for (var i =0; i < data.length; i++){
          add.push(data[i].address);
        }

        var geocoder = new google.maps.Geocoder();
        geocodeAddress(geocoder, address);

        $('#listing_results').html("");
        if (data){
          data.forEach(function(result){
            var tr = $("<tr>");
            var td = $("<td>").text(result.user_id).appendTo(tr);
            var td = $("<td>").text(result.square_footage).appendTo(tr);
            var td = $("<td>").text(result.bedroom).appendTo(tr);
            var td = $("<td>").text(result.bathroom).appendTo(tr);
            var td = $("<td>").text(result.price).appendTo(tr);
            var td = $("<td>").text(result.address).appendTo(tr);
            var td = $("<td>").text(result.furnished).appendTo(tr);
            var td = $("<td>").text(result.pets).appendTo(tr);
            var td = $("<td>").text(result.smoking).appendTo(tr);
            var td = $("<td>").text(result.floor_number).appendTo(tr);
            var td = $("<td>").text(result.parking_space).appendTo(tr);
            var td = $("<td>").text(result.storage_space).appendTo(tr);
            var td = $("<td>").text(result.balcony).appendTo(tr);
            var td = $("<td>").text(result.available_date).appendTo(tr);
            var td = $("<td>").text(result.minimum_lease).appendTo(tr);
            var td = $("<td>").text(result.image).appendTo(tr);
            var td = $("<td>").text(result.title).appendTo(tr);
            var td = $("<td>").text(result.rental_type).appendTo(tr);
            var td = $("<td>").text(result.description).appendTo(tr);
            tr.appendTo('#listing_results')

          });
        }
      }
    })

    return false;
  });
});
