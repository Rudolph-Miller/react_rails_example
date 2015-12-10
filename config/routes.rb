Rails.application.routes.draw do
  resources :todos do
    collection do
      get 'index'
    end
  end
end
