module Api
  module V1
    module Superadmins
      class RegistrationsController < Devise::RegistrationsController
        def create
          superadmin = Superadmin.new(sign_up_params)
        
          if superadmin.save
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