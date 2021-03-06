class ListingsController < ApplicationController
  before_action :set_listing, only: [:show, :edit, :update, :destroy]

  # GET /listings
  # GET /listings.json
  def index
    @current_user = current_user
    @listings = Listing.where(:user_id => @current_user.id)
    @listings_belong_to_user = true
    respond_to do |format|
      format.html
    end
  end


  # GET /listings/1
  # GET /listings/1.json
  def show
    @listing_images = @listing.listing_images.all
    @current_user = current_user
    @listings = Listing.find(params[:id])

    respond_to do |format|
      format.html
    end
  end

  # GET /listings/new
  def new
    @listing = Listing.new
    @listing_images = @listing.listing_images.build
    @current_user = current_user
    @user_first_name
    @listing.user_id = @current_user.id
  end

  # GET /listings/1/edit
  def edit
  end

  # POST /listings
  # POST /listings.json
  def create
    @listing = Listing.new(listing_params)
    # var coor = # return from google api
    # @listing.lat = coor[1];
    # @listing.lon = coor[2];
    respond_to do |format|
      if @listing.save
        params[:listing_images]['image'].each do |a|
            @listing_image = @listing.listing_images.create!(:image => a)
        end
        format.html { redirect_to @listing, notice: 'Listing was successfully created.' }
        format.json { render :show, status: :created, location: @listing }
      else
        format.html { render :new }
        format.json { render json: @listing.errors, status: :unprocessable_entity }
      end
    end
  end

  def results
    @users = User.all
    @listings = Listing.includes([:favourites, :user, :listing_images])
    @listings_belong_to_user = false

    # if !params[:city].nil?
      @city = params[:city]
      @listings = @listings.city(@city)
    # end
    
    if !params[:min_price].empty?
      @listings = @listings.min_price(params[:min_price])
    end

    if !params[:max_price].empty?
      @listings = @listings.max_price(params[:max_price])
    end

    if !params[:number_of_bedrooms].empty?
      @listings = @listings.number_of_bedrooms(params[:number_of_bedrooms])
    end

    if !params[:pets].nil?
      @listings = @listings.pets(!params[:pets].nil?)
    end


    if !params[:rental_type].empty?
      @listings = @listings.rental_type(params[:rental_type])
    end


    if !params[:parking].nil?
      @listings = @listings.parking(!params[:parking].nil?)
    end

    if !params[:smoking].nil?
      @listings = listings.smoking(!params[:smoking].nil?)
    end

    if !params[:furnished].nil?
      @listings = @listings.furnished(!params[:furnished].nil?)
    end

    if !params[:storage].nil?
      @listings = @listings.storage(!params[:storage].nil?)
    end

    @listings = @listings.map do |listing|
      {
        listing: listing,
        favourites: listing.favourites.where(user_id: current_user.id).first,
        user: @users.where(id: listing.user_id),
        listing_images: listing.listing_images
      }
    end
    render json: @listings
  end
  
  def sendrequest 
    @listing = Listing.find(params[:id])
    @user = @listing.user
    @current_user = current_user  
    
    respond_to do |format|

      if @current_user
        UserMailer.contact_email(@user).deliver
        format.html { redirect_to listing_path(@listing.id), notice: 'Request for viewing sent.' }
      end
    end
  end

  # PATCH/PUT /listings/1
  # PATCH/PUT /listings/1.json
  def update
    respond_to do |format|
      if @listing.update(listing_params)
            params[:listing_images]['image'].each do |a|
            @listing_image = @listing.listing_images.create!(:image => a)
        end
        format.html { redirect_to @listing, notice: 'Listing was successfully updated.' }
        format.json { render :show, status: :ok, location: @listing }
      else
        format.html { render :edit }
        format.json { render json: @listing.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /listings/1
  # DELETE /listings/1.json
  def destroy
    @listing.destroy
    respond_to do |format|
      format.html { redirect_to listings_url, notice: 'Listing was successfully destroyed.' }
      format.json { head :no_content }
    end

    # redirect_to "listings/index"
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_listing
      @listing = Listing.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def listing_params
      params.require(:listing).permit(:user_id, :square_footage, :bedroom, :bathroom, :price, :address, :furnished, :pets, :smoking, :floor_number, :parking_space, :storage_space, :balcony, :available_date, :minimum_lease, :title, :rental_type, :description, listing_images_attributes: [:image])
    end
end
