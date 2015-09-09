require 'test_helper'

class ListingImagesControllerTest < ActionController::TestCase
  setup do
    @listing_image = listing_images(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:listing_images)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create listing_image" do
    assert_difference('ListingImage.count') do
      post :create, listing_image: { image: @listing_image.image, listing_id: @listing_image.listing_id }
    end

    assert_redirected_to listing_image_path(assigns(:listing_image))
  end

  test "should show listing_image" do
    get :show, id: @listing_image
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @listing_image
    assert_response :success
  end

  test "should update listing_image" do
    patch :update, id: @listing_image, listing_image: { image: @listing_image.image, listing_id: @listing_image.listing_id }
    assert_redirected_to listing_image_path(assigns(:listing_image))
  end

  test "should destroy listing_image" do
    assert_difference('ListingImage.count', -1) do
      delete :destroy, id: @listing_image
    end

    assert_redirected_to listing_images_path
  end
end
