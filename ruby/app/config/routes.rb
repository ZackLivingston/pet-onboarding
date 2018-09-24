# TODO figure out how the hell routing works. This isn't a definitive
# list of all the routes, some seem to get generated automatically based
# on the controllers, some seem to not need parts of the url that others
# do, the whole thing is a confusing mess and no other tutorials seem
# to set up their routes file like this so there's no basis for comparison

Rails.application.routes.draw do
  get 'sessions/new'
  root 'static_pages#home'
  get 'help' => 'static_pages#help'
  get 'contact' => 'static_pages#contact'
  get 'signup' => 'users#new'
  get 'model/User' => 'model#User'
  get 'model/name:string' => 'model#name:string'
  get 'model/email:string' => 'model#email:string'
  get 'users/new' => 'users#new'
  get 'users/create' => 'users#create'
  get 'login' => 'sessions#new'
  post 'login' => 'sessions#create'
  delete 'logout' => 'sessions#destroy'
  resources :microposts, only: [:index, :create, :destroy]
  resources :users
  resources :account_activations, only: [:edit]
end
