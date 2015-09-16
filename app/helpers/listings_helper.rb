module ListingsHelper

  def set_favourite_class(user_id, listing_id)
    fav_exists = Favourite.where(:user_id => user_id, :listing_id => listing_id).exists? 
    state = (fav_exists ? "favourited" : "unfavourite")
    content_tag(:button, "Favourite",  { :class => "favourite_btn #{state}", :data => { :listing_id => listing_id } } ) do
      # hidden_field_tag(:fave_user_id, user_id) +
      # hidden_field_tag(:fave_listing_id, listing_id)
    end 
  end

end
