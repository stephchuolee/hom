
module ListingsHelper

  def set_favourite_class(user_id, listing_id)
    fav_exists = Favourite.where(:user_id => user_id, :listing_id => listing_id).exists? 
    my_class = (fav_exists ? "favourited" : "unfavourite")
    content_tag(:button, "Favourite", :class => "favourite_btn #{my_class}" ) do
      hidden_field_tag(:fave_user_id, user_id) +
      hidden_field_tag(:fave_listing_id, listing_id)
    end


    # if 
    #   content_tag(:button, :class => "unfavourite", :class => "favourite_btn") do
    #     Favourite
        
    #   end 
    # else 
    #   content_tag(:button, :class => "favourite", :class => "favourite_btn") do
    #     Favourite
    #     hidden_field_tag(:user_id, @current_user.id, :class => "fave_user_id")
    #     hidden_field_tag(:listing_id, listing.id, :class => "fave_listing_id")
    #   end 
    # end 
  end 

  def favourite_btn_contents

  end 

end
