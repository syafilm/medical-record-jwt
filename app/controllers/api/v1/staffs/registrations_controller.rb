module Api
  module V1
    module Staffs
      class RegistrationsController < Devise::RegistrationsController
        def create
          staff = Staff.new(sign_up_params)
        
          if staff.save
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