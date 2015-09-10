$(function(){

  $('.favourite_btn').on('click', function(){
    var user_id = $("#fave_user_id").val();
    var listing_id = $(this).find('#fave_listing_id').val();
    var that = $(this);
    
    if ($(that).hasClass('favourited')){ 
        unfavourite(user_id, listing_id, that)
    } else {
        favourite(user_id, listing_id, that);

    }
    // console.log('favourite clicked')
  });
 
  function favourite(user_id, listing_id, that){ 
    $.ajax({
      url: '/users/' + user_id + '/favourites',
      type: "POST",
      data: {user_id: user_id, listing_id: listing_id },
      success: function(){ 
        that.addClass('favourited')
        that.removeClass('unfavourite')
        // console.log('favourited')
      }
    });
  }
    
  function unfavourite(user_id, listing_id, that){
  
    $.ajax({
      url: '/users/' + user_id + '/favourites?listing_id=' + listing_id,
      type: "DELETE",
      success: function(){
        that.addClass('unfavourite');
        that.removeClass('favourited');
          // console.log('unfavourited')
      }
    });    

  }

});



