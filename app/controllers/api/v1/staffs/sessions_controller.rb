module Api
  module V1
    module Staffs
      class SessionsController < Devise::SessionsController

        def create
          staff = Staff.find_by_email(sign_in_params[:email])
        
          if staff && staff.valid_password?(sign_in_params[:password])
            token = staff.generate_jwt
            render json: token.to_json
          else
            render json: { errors: { 'email or password' => ['is invalid'] } }, status: :unprocessable_entity
          end
        end
      end
    end
  end
end