require 'test_helper'

class ListingsControllerTest < ActionController::TestCase
  setup do
    @listing = listings(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:listings)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create listing" do
    assert_difference('Listing.count') do
      post :create, listing: { address: @listing.address, available_date: @listing.available_date, balcony: @listing.balcony, bathroom: @listing.bathroom, bedroom: @listing.bedroom, description: @listing.description, floor_number: @listing.floor_number, furnished: @listing.furnished, image: @listing.image, minimum_lease: @listing.minimum_lease, parking_space: @listing.parking_space, pets: @listing.pets, price: @listing.price, rental_type: @listing.rental_type, smoking: @listing.smoking, square_footage: @listing.square_footage, storage_space: @listing.storage_space, title: @listing.title, user_id: @listing.user_id }
    end

    assert_redirected_to listing_path(assigns(:listing))
  end

  test "should show listing" do
    get :show, id: @listing
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @listing
    assert_response :success
  end

  test "should update listing" do
    patch :update, id: @listing, listing: { address: @listing.address, available_date: @listing.available_date, balcony: @listing.balcony, bathroom: @listing.bathroom, bedroom: @listing.bedroom, description: @listing.description, floor_number: @listing.floor_number, furnished: @listing.furnished, image: @listing.image, minimum_lease: @listing.minimum_lease, parking_space: @listing.parking_space, pets: @listing.pets, price: @listing.price, rental_type: @listing.rental_type, smoking: @listing.smoking, square_footage: @listing.square_footage, storage_space: @listing.storage_space, title: @listing.title, user_id: @listing.user_id }
    assert_redirected_to listing_path(assigns(:listing))
  end

  test "should destroy listing" do
    assert_difference('Listing.count', -1) do
      delete :destroy, id: @listing
    end

    assert_redirected_to listings_path
  end
end
