$(function(){


  function renderResults(result){
    var tr = $("<tr>");
    $("<td>").text(result.listing.user_id).appendTo(tr);
    $("<td>").text(result.listing.price).appendTo(tr);
    var td = $("<td>").text(result.listing.address).appendTo(tr);
    var td = $("<td>").text(result.listing.available_date).appendTo(tr);
    var td = $("<td>").text(result.listing.image).appendTo(tr);
    var td = $("<td>").text(result.listing.title).appendTo(tr);
    var td = $("<td>").text(result.listing.rental_type).appendTo(tr);
    var td = $("<td>").text(result.listing.description).appendTo(tr);
    var class_name = result.favourites ? "favourited" : "unfavourite"
    var id = result.listing.id

    $("<td><button class='favourite_btn " + class_name + "'></button></td>").appendTo(tr);
    $("<td><a href='/listings/" + id + "'>Show</a></td>").appendTo(tr);
    tr.appendTo('#listing_results');

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
    console.log(rental_type)
    console.log(parking)

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

