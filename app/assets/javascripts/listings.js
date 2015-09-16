var map;
var markers = [];
var infoWindow;
var service;


function initMap() {
  if (document.getElementById('map') != null ){
    var id = $('#map').data('listing-id');
    infoWindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
        });
    getAddresses();
    if (document.location.pathname.match(/(\d)+$/)) {
      importFoursquare();
      // getWalkScore(); // walkscore requires API key which is not available at this
    }

  }
}


function getAddresses(){
  var address = extractAddresses();
  var geocoder = new google.maps.Geocoder();
  for (var i =0; i<address.length; i++){
    geocodeAddress(geocoder,address[i],i);
  }
}

function extractAddresses(){
  var addresses = [];
  var add = $('.address');
  for (var i =0; i < add.length; i++){
    if($($('.address')[i]).html() != ""){
      addresses.push($($('.address')[i]).html());
    }
  }
  return addresses;
}

function geocodeAddress(geocoder, address, i) {
  geocoder.geocode({'address': address}, function(results, status) {
    var coord = results[0].geometry.location;
    if (status === google.maps.GeocoderStatus.OK) {
      map.setCenter(coord);
      addMarker(coord,i);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function addMarker(coord,i){
  var marker_new = new google.maps.Marker({
    map: map,
    position: coord
  });
  marker_new.metadata = {type: "point", id: i};

  marker_new.addListener('mouseover', function(){
    $("#listing_results").find(".listingDiv:nth-child("+(this.metadata.id+1)+")").addClass("hovered");
  });
  marker_new.addListener('mouseout', function(){
    $("#listing_results .information:nth-child("+(this.metadata.id+1)+")").removeClass("hovered");
    // $("#listing_results").find("[data-listing-id='"+i+"']").removeClass("hovered");
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

// function getWalkScore(){
//   var apiKey = "cb3802ad81619c6bf84047973cde719a";
//   var address = $('li').find('.address').html();
//   var geocoder = new google.maps.Geocoder();
//   geocoder.geocode({'address': address}, function(results, status) {
//     var coord = results[0].geometry.location;
//     $.ajax({
//       url: 'http://api.walkscore.com/score?format=json&address=' + address
//         +'&lat=' +coord["G"]
//         +'&lon'+ coord["K"]
//         +'&wsapikey=' + apiKey,
//       dataType: 'json',
//       success: function(data){
//         debugger;
//         console.log(data);
//       }
//     });
//   });
// }
function importFoursquare(){
  var client_id = "ACY5FCHS13VT51FDX4FRG5YN25CY30534NV34ADSC1DX2WTE";
  var client_secret = "4HQLZ1DKORVCBURYHPIBYANQPXR55F2PWMZUCXNKPD3FQDQ4";
  var address = $('.information').find('.address').html();
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({'address': address}, function(results, status) {
    var coord = results[0].geometry.location;
    $.ajax({
      url: 'https://api.foursquare.com/v2/venues/explore?'
          +'ll='+ coord["H"].toFixed(3) +","+coord["L"].toFixed(3)
          +"&client_id=" + client_id
          +"&client_secret=" + client_secret
          +"&v=20150910", // today date is hardcoded. may need to update/automate it later
      dataType: 'json',
      success: function(data){
        for (var i=0; i < 8 ; i++){
          var nameDiv = $('.foursquare_'+i).find(".name");
          var addDiv = $('.foursquare_'+i).find(".address");
          var tipsDiv = $('.foursquare_'+i).find(".tips");
          var item = data.response.groups[0].items[i];
          var ratingDiv = $('.foursquare_'+i).find(".rating");
          var ratingnumberDiv = $('.foursquare_'+i).find(".ratingnumber");
          nameDiv.append(item.venue.name);
          addDiv.append(item.venue.location.address);
          for (var j=0; j < item.tips.length; j++){
            var tip = document.createElement("div");
            tip.innerHTML = item.tips[j].text;
            $(tip).appendTo(tipsDiv);
          }
          ratingnumberDiv.append(item.venue.rating.toFixed(1));
          ratingDiv.css("background-color", '#'+item.venue.ratingColor);
          if( item.venue.url){
            $('.foursquare_'+i).find('a').attr('href',item.venue.url).attr('target','_blank');
          }
        }
      }
    });
  });
}

$(function(){
  $('.bxslider').bxSlider({
    controls: true,
    nextText: '',
    prevText: '',
    infiniteLoop: false,
    hideControlOnEnd: true
  });
  $('#booking_link').on('click', function() {

  });


  $('.listingDiv').hover(function(){
    // mouse enter
    $(this).addClass("hovered");
  }, function(){
    // mouse leave
    $(this).removeClass("hovered");
  })


  $('.listingDiv').on('click', function(){
    var id = $(this).data('listing-id');
    var address = $(this).find('.address').html();
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
        var geocoder = new google.maps.Geocoder();
        for (var i =0; i < data.length; i++){
          geocodeAddress(geocoder, data[i].address)
        }
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
