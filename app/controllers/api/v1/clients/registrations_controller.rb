module Api
  module V1
    module Clients
      class RegistrationsController < Devise::RegistrationsController
        def create
          client = Client.new(sign_up_params)
        
          if client.save
            token = client.generate_jwt
            render json: token.to_json
          else
            render json: { errors: { 'email or password' => ['is invalid'] } }, status: :unprocessable_entity
          end
        end
      end
    end
  end
end