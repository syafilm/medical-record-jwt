Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.htm

  #guest section
  get '/', to: 'guests#index'

  #superadmin section
  get '/superadmin/login', to: 'superadmins#login'
  get '/superadmin/register', to: 'superadmins#register'
  get '/superadmin', to: 'superadmins#home'
  get '/superadmin/staff/new', to: 'superadmins#staff_new'
  
  #staff section
  get '/staff/login', to: 'staffs#login'
  get '/staff/register', to: 'staffs#register'
  get '/staff', to: 'staff#home'

  #client section
  get '/client/login', to: 'clients#login'
  get '/client/register', to: 'clients#register'
  get '/client', to: 'client#home'

  #general scope api
  namespace :api do
    namespace :v1 do
      resources :users, only: %i[] do
        collection do
          get 'detail', to: 'users#detail'
        end
      end
    end
  end

  
  #devise only scope api
  scope :api do
    scope :v1 do
      #superadmins
      devise_for :superadmins,
        controllers: {
          registrations: 'api/v1/staffs/registrations',
          sessions: 'api/v1/staffs/sessions'
        },
        path_names: { 
          sign_in: '',
          sign_out: '',
          sign_up: ''
        },
        skip: [:registrations]
        as :superadmin do
          post 'superadmins/register' => 'api/v1/superadmins/registrations#create'
          post 'superadmins/login' => 'api/v1/superadmins/sessions#create'
        end

      #staffs
      devise_for :staffs,
        controllers: { 
          registrations: 'api/v1/staffs/registrations',
          sessions: 'api/v1/staffs/sessions'
        },
        path_names: { 
          sign_in: '',
          sign_out: '',
          sign_up: ''
        },
        skip: [:registrations]
        as :staff do
          post 'staffs/register' => 'api/v1/staffs/registrations#create'
          post 'staffs/login' => 'api/v1/staffs/sessions#create'
        end

      #clients
      devise_for :clients,
        controllers: { 
          registrations: 'api/v1/clients/registrations',
          sessions: 'api/v1/clients/sessions'
        },
        path_names: { 
          sign_in: '',
          sign_out: '',
          sign_up: ''
        },
        skip: [:registrations]
        as :client do
          post 'clients/register' => 'api/v1/clients/registrations#create'
          post 'clients/login' => 'api/v1/clients/sessions#create'
        end
    end
  end

end
