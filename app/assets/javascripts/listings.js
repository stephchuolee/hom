var map;
var markers = [];
var infoWindow;
var service;

var addresses = [];


function initMap() {
  if (document.getElementById('map') != null ){
    var id = $('#map').data('listing-id');
    infoWindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
        });
    // console.log('Google ready, geocode', addresses);
    getAddresses();
    if (document.location.pathname.match(/listings\/(\d)+$/)) {
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

  // $('.address')
  //     .map(function(idx, t) { return t.innerText; })
  //     .filter(function(x) { return !x; })
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
  // var address = $('.information').find('.address').html();
  var address = $('.address').html();
  // var address = addresses[0];
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({'address': address}, function(results, status) {
    if(results.length === 0) { return; }
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

  function renderResults(result){
    console.log(result);

    var listingDiv = $("<div class='listingDiv listing information col s6' data-listing-id=" + result.listing.id + ">");

    // var image = $("<img src='/uploads/listing_image/image/'" + result.listing.images + ">").appendto(listingDiv)
    var infoDiv = $("<div class='information col s12'>").appendTo(listingDiv)
    var title = $("<h3 class='title'><a href='/listings/" + result.listing.id + "'>" + result.listing.title + "</a></h3>").appendTo(infoDiv)
    var address = $("<h5 class='address'>" + result.listing.address + "</h5>").appendTo(infoDiv)

    var user = $("<h5 class='user'><a href='/users/" + result.user[0]["id"] + "'>" + result.user[0]["name"] + "</a></h5>").appendTo(infoDiv)


    // users shouldn't be able to see favourite if it is their own listing
    // favourites don't always persist


    var class_name = result.favourites ? "favourited" : "unfavourite"
    $("<button data-listing-id='" + result.listing.id + "' class='favourite_btn " + class_name + "'></button>").appendTo(infoDiv);

    listingDiv.appendTo('#listing_results');


  }



  $('#filter_form').on('submit', function(event) {

    event.preventDefault;
    var city = $('#city').val();
    var input = $(this).serialize();
    var min_price = $('#min_price').val();
    var max_price = $('#max_price').val();
    var number_of_bedrooms = $('#number_of_bedrooms').val();
    var rental_type = $('#rental_type').val();
    var pets = $('#pets').val();
    var parking = $('#parking').val();
    var smoking = $('#smoking').val();
    var furnished = $('#furnished').val();
    var storage = $('#storage').val();


    $.ajax({
      url: '/listings/results?' + input, 
      dataType: "json", 
      success: function(data, status) {
        $('#listing_results').empty();

        if (data){
          deleteMarkers();
          var geocoder = new google.maps.Geocoder();
          for (var i =0; i < data.length; i++){
            geocodeAddress(geocoder, data[i].listing.address)
          }
          data.forEach(function(result){
            renderResults(result)
          });
        }
      }

    });
    // should NOT return anything, DO NOT use "return false"
    // return false; 
    return false;

    // var currentState = history.state;

    // var state = {id: 'search_results_page'}
    // var url = "'&min_price=' + min_price + '&max_price=' + max_price + ' &number_of_bedrooms=' + number_of_bedrooms + '&rental_type=' + rental_type + '&pets=' + pets + '&parking=' + parking + '&smoking=' + smoking + '&furnished=' + furnished + '&storage=' + storage"

    // search?utf8=✓&min_price=&max_price=&number_of_bedrooms=&rental_type=Sublet&more_filters=&commit=Apply+Filters
    // history.pushState(state, '', url)


  });

});
