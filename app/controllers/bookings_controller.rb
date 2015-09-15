class BookingsController < ApplicationController
  before_action :set_booking, only: [:show, :edit, :update, :destroy]

  # GET /bookings
  # GET /bookings.json
  def index
    @current_user = current_user
    @bookings = Booking.where(user_id: @current_user.id)
    if @bookings.empty?
      redirect_to new_user_booking_path(user_id: @current_user.id)
    elsif @current_user.id == @bookings.find_by(params[:user_id]).user_id
      render 'bookings/index'
    else
      redirect_to user_path(@current_user.id)
    end
  end

  # GET /bookings/1
  # GET /bookings/1.json
  def show
    @current_user = current_user
    @user = User.find(params[:id])
    @booking = Booking.where(user_id: @current_user.id)
    if @current_user.id == @user.id
      @booking
    else
      redirect_to user_path
    end
  end

  # GET /bookings/new
  def new
    @booking = Booking.new
    @current_user = current_user
    @booking.user_id = @current_user.id
  end

  # GET /bookings/1/edit
  def edit
  end

  # POST /bookings
  # POST /bookings.json
  def create
    @booking = Booking.new(booking_params)
    @current_user = current_user
    @listing = Listing.where(user_id: @current_user.id)
    respond_to do |format|
     @booking.user_id = @current_user.id
     @booking.listing_id = params[:listing_id]
      if @booking.save
        format.html { redirect_to [:user, id: @current_user.id], notice: 'Booking was successfully created.' }
        format.json { render :show, status: :created, location: @booking }
      else
        format.html { render :new }
        format.json { render json: @booking.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /bookings/1
  # PATCH/PUT /bookings/1.json
  def update
    respond_to do |format|
      @user = @booking.user_id
      if @booking.update(booking_params)
        UserMailer.contact_email(@user).deliver
        format.html { redirect_to @booking, notice: 'Booking was successfully updated.' }
        format.json { render :show, status: :ok, location: @booking }
      else
        format.html { render :edit }
        format.json { render json: @booking.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /bookings/1
  # DELETE /bookings/1.json
  def destroy
    @booking.destroy
    respond_to do |format|
      format.html { redirect_to bookings_url, notice: 'Booking was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_booking
      @booking = Booking.find_by(params[user_id: current_user.id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def booking_params
      params.require(:booking).permit(:listing_id, :renter_id, :date, :start_time, :end_time, :user_id)
    end
end
