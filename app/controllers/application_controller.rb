class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def restricted_access
    redirect_to new_session_path, alert: 'you must be logged in'\
      unless current_user
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def search
    @listings = Listing.all

    if !params[:city].empty?
      @city = params[:city]
      @listings = @listings.city(params[:city])
    end
    render "listings/index"
  end

  helper_method :current_user, :search

end
