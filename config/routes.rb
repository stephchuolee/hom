Rails.application.routes.draw do
  get "listings/search"

  root :to => "sessions#index"

  # custom routing /dashboard, will use jsx to render actual page
#  get "/dashboard"

  resource :session

  resources :sessions

  resources :users do
  # bookings should be available under /users/id/bookings
    resources :bookings, only: [:show, :index]
  # all listings should belong to a user
    resources :listings do
  # bookings belong to listings
      resources :bookings, only: [:new, :destroy]
    end
  # users can have favourites
    resources :favourites, only: [:new, :create, :destroy, :index, :show]
  end
  # users should be able to view listings even without a user_id
  resources :listings, only: [:show, :index] do

    resources :users, only: [:show]

  end
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
