module Api
  module V1
    module Clients
      class SessionsController < Devise::SessionsController

        def create
          client = Client.find_by_email(sign_in_params[:email])
        
          if client && client.valid_password?(sign_in_params[:password])
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