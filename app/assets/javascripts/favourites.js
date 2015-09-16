$(function(){

  $('body').on('click', '.favourite_btn', function(){

    // var user_id = $("#fave_user_id").val();
    // var listing_id = $(this).find('#fave_listing_id').val();


    var that = $(this);
    var listing_id = that.data('listingId');
    
    if ($(that).hasClass('favourited')) { 
        unfavourite(listing_id, that)
    } else {
        favourite(listing_id, that);
    }
    // console.log('favourite clicked')
  });
 
  function favourite(listing_id, that) { 
    $.ajax({
      url: '/users/0/favourites',
      type: "POST",
      data: {listing_id: listing_id },
      success: function(){ 
        that.addClass('favourited')
        that.removeClass('unfavourite')
        // console.log('favourited')
      }
    });
  }
    
  function unfavourite(listing_id, that) {
    $.ajax({
      url: '/users/0/favourites?listing_id=' + listing_id,
      type: "DELETE",
      success: function(){
        that.addClass('unfavourite');
        that.removeClass('favourited');
          // console.log('unfavourited')
      }
    });    
  }
});



