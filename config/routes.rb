Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.htm

  #guest section
  get '/', to: 'guests#index'

  #superadmin section
  get '/superadmin/login', to: 'superadmins#login'
  get '/superadmin/register', to: 'superadmins#register'
  get '/superadmin', to: 'superadmins#home'
  get '/superadmin/staffs', to: 'superadmins#staffs'
  get '/superadmin/staffs/new', to: 'superadmins#staffs_new'
  get '/superadmin/staffs/:slug', to: 'superadmins#staffs_detail'
  get '/superadmin/clients', to: 'superadmins#clients'
  get '/superadmin/clients/new', to: 'superadmins#clients_new'
  get '/superadmin/clients/:slug', to: 'superadmins#clients_detail'
  get '/superadmin/settings', to: 'superadmins#settings'
  
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

      resources :documents, only: %i[create destroy] do
        member do
          get 'list', to: 'documents#list'
        end
      end

      resources :users, only: %i[] do
        collection do
          get 'detail', to: 'users#detail'
        end
      end

      namespace :superadmins do
        resources :staffs, only: %i[create index] do
          member do
            get 'detail', to: 'staffs#detail'
            put 'update', to: 'staffs#update'
          end
        end

        resources :clients, only: %i[create index] do
          member do
            get 'detail', to: 'clients#detail'
            put 'update', to: 'clients#update'
          end
        end

        resources :tags, only: %i[] do
          collection do
            get 'list', to: 'tags#list'
          end
        end

        resources :qualifications, only: %i[] do
          collection do
            get 'list', to: 'qualifications#list'
          end
        end

        resources :departments, only: %i[] do
          collection do
            get 'list', to: 'departments#list'
          end
        end

        resources :jobs, only: %i[] do
          collection do
            get 'list', to: 'jobs#list'
          end
        end

        resources :clinic_structures, only: %i[] do
          member do
            put 'update', to: 'clinic_structures#update'
            get 'detail', to: 'clinic_structures#detail'
          end
        end

        resources :clinic_addresses, only: %i[] do
          member do
            put 'update', to: 'clinic_addresses#update'
            get 'detail', to: 'clinic_addresses#detail'
          end
        end
        
        resources :employee_states, only: %i[] do
          member do
            put 'update', to: 'employee_states#update'
            get 'detail', to: 'employee_states#detail'
          end
        end

        resources :bank_accounts, only: %i[] do
          member do
            put 'update', to: 'bank_accounts#update'
            get 'detail', to: 'bank_accounts#detail'
          end
        end

        resources :contacts, only: %i[] do
          member do
            put 'update', to: 'contacts#update'
          end

          collection do
            get 'list', to: 'contacts#list'
          end
        end
        
        resources :price_conditions, only: %i[create destroy] do
          member do
            put 'update', to: 'price_conditions#update'
          end

          collection do
            get 'list', to: 'price_conditions#list'
          end
        end

        resources :price_settings, only: %i[] do
          member do
            put 'update', to: 'price_settings#update'
          end
        end

        resources :search, only: %i[] do
          collection do
            get ':keyword', to: 'search#search'
          end
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
          registrations: 'api/v1/superadmins/registrations',
          sessions: 'api/v1/superadmins/sessions'
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
