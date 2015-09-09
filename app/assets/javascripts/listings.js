

var map;
var markers = [];

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
  markers.push(marker_new);
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

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function deleteMarkers() {
  setMapOnAll(null);
  markers = [];
}


$(function(){
  $('.listingDiv').on('click', function(){
    var id = $(this).data('listing-id');
    recenterMap(id);
    // getAddresses(id);
  })

  $('#filter_form').on('submit', function(event){
    event.preventDefault;
    var city = $('#city').val();
    var input = $(this).serialize();
    
    $.ajax({
      url: '/listings/results?' + input, 
      dataType: "json", 
      success: function(data, status){
        /*console.log(typeof (data));
        data = JSON.parse(JSON.stringify(data));*/
        // console.log(data);
        // data.forEach(function (result) {
        //   console.log('user: ' + result.user_id);
        //   console.log('price: ' + result.price);
        // });
        
        // clear all markers
        // put markers with new "data"
        // recenter with (first/last) element
        
        deleteMarkers();
        var addresses= extractAddresses(data);
        var geocoder = new google.maps.Geocoder();
        geocodeAddress(geocoder, map, addresses);

        
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
