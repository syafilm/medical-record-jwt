module Api
  module V1
    module Superadmins
      class SessionsController < Devise::SessionsController

        def create
          superadmin = Superadmin.find_by_email(sign_in_params[:email])
        
          if superadmin && superadmin.valid_password?(sign_in_params[:password])
            sign_in(:superadmin, superadmin)
            token = superadmin.generate_jwt
            render json: token.to_json
          else
            render json: { errors: { 'email or password' => ['is invalid'] } }, status: :unprocessable_entity
          end
        end
        
      end
    end
  end
end