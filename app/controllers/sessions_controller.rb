class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id 
      redirect_to movies_path, notice: "Welcome back, #{user.name}!"
    else 
      flash.now[:alert] = "Log in failed!"
      render :new
    end 
  end
  

  def destroy
  end
end
