class SessionsController < ApplicationController

  def index
    @current_user = current_user
    if @current_user
      @user_first_name = @current_user.name.split(" ")[0]
    end
  end

  def new
    @hide_search = true
  end

  def create
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to root_path, notice: "Welcome back, #{user.name}!"
    else
      flash.now[:alert] = "Log in failed!"
      render :new
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end
end
