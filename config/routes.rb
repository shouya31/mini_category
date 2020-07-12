Rails.application.routes.draw do
  root 'searches#new'
  resources :searches, only:[:new]
  get '/search/:id', to: 'searches#search'
end
