class SessionsController < ApplicationController
  def index
  end

  def new
  end

  def create
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to listings_path, notice: "Welcome back, #{user.name}!"
    else
      flash.now[:alert] = "Log in failed!"
      render :new
    end
  end


  def destroy
    session[:user_id] = nil
    redirect_to listings_path
  end
end
