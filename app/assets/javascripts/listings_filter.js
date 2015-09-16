$(function(){


  function renderResults(result){

    var listingDiv = $("<div class='listingDiv listing information col s6' data-listing-id=" + result.listing.id + ">");

    var image = $("<img src='" + result.listing.listing_images + "'>")
    var infoDiv = $("<div class='information col s12'>").appendTo(listingDiv)
    var title = $("<h3 class='title'><a href='/listings/" + result.listing.id + "'>" + result.listing.title + "</a></h3>").appendTo(infoDiv)
    var address = $("<h5 class='address'>" + result.listing.address + "</h5>").appendTo(infoDiv)

    var user = $("<h5 class='user'><a href='/users/" + result.user[0]["id"] + "'>" + result.user[0]["name"] + "</a></h5>").appendTo(infoDiv)


    


    var class_name = result.favourites ? "favourited" : "unfavourite"
    $("<button class='favourite_btn " + class_name + "'></button>").appendTo(infoDiv);

    listingDiv.appendTo('#listing_results');


  }



  $('#filter_form').on('submit', function(event){
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
      success: function(data, status){
        $('#listing_results').html("");
        if (data){
          data.forEach(function(result){
            renderResults(result)
          });
        }
      }
    })

    // var currentState = history.state;

    // var state = {id: 'search_results_page'}
    // var url = "'&min_price=' + min_price + '&max_price=' + max_price + ' &number_of_bedrooms=' + number_of_bedrooms + '&rental_type=' + rental_type + '&pets=' + pets + '&parking=' + parking + '&smoking=' + smoking + '&furnished=' + furnished + '&storage=' + storage"

    // search?utf8=✓&min_price=&max_price=&number_of_bedrooms=&rental_type=Sublet&more_filters=&commit=Apply+Filters
    // history.pushState(state, '', url)

  });




});

