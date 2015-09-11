class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def restricted_access
    if !current_user
      flash[:alert] = "You must be logged in"
      redirect_to new_session_path
    end
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def index
    @listings = Listing.all
    @current_user = current_user
  end

  def search
    @listings = Listing.all

    if !params[:city].nil?
      @city = params[:city]
      @listings = @listings.city(params[:city])
    end
    
    render "listings/index"
  end



  

  helper_method :current_user, :search

end
