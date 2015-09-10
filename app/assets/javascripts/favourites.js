$(function(){

  $('.favourite_btn').on('click', function(){
    var user_id = $("#user_id").val();
    var listing_id = $(this).find('.fave_listing_id').val();
    var that = $(this);

    // #(this).addClass('favourited')

    $.ajax({
      url: '/users/' + user_id + '/favourites',
      type: "POST",
      data: {user_id: user_id, listing_id: listing_id },
      success: function(){ 
        that.addClass('favourited')
        console.log(that)
      }
    });

  });

  // $('.favourited')

});



