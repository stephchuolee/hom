module ListingsHelper

  def set_favourite_class(user_id, listing_id)
    fav_exists = Favourite.where(:user_id => user_id, :listing_id => listing_id).exists? 
    state = (fav_exists ? "favourited" : "unfavourite")
    content_tag(:button, "Favourite",  { :class => "favourite_btn #{state}", :data => { :listing_id => listing_id } } ) do
      content_tag(:div, "", {:class => "heart-shape"})
    end 
  end

end



