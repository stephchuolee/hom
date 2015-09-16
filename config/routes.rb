Rails.application.routes.draw do
  
  get "listings/search"
  get "listings/results"
  delete "/users/:user_id/favourites", to: "favourites#destroy"
  
  # ActionMailer path that will send an email every time a booking time is clicked
  #scope "(:locale)" do
  #  resources :listings, :path => "routes.listings", only: [:index, :show]
  #end

  # The main hompage of the app will be the index page of sessions. This
  # will include login, logout, signup, etc
  root :to => "sessions#index"
  
  # custom routing /dashboard, will use jsx to render actual page
  # get "/dashboard"
  
  resource :sessions, only: [:new, :create, :index, :destroy]
  
  resources :bookings, only: [:index, :destroy]
  
  resources :listings do
    member do
      get 'sendrequest' => 'listings#sendrequest'
    end
  end

  resources :listing_images
  
  resources :users do
    member do
      get 'sendrequest' => 'users#sendrequest'
    end

    resources :bookings, only: [:new, :create, :edit]
    resources :favourites, only: [:new, :create, :destroy, :index, :show]
  end
  
  # resources :listing_images

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
