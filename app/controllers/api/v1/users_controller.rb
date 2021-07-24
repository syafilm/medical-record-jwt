module Api
  module V1
    class UsersController < Api::V1::BaseController

      def detail
        jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1].remove('"'), Rails.application.secrets.secret_key_base).first
        @current_user_id = jwt_payload['id']
        @current_user_role = jwt_payload['role']

        @current_user = {}

        if @current_user_role == 'staff'
          @current_user = Staff.find(@current_user_id)
        elsif @current_user_role == 'superadmin'
          @current_user = Superadmin.find(@current_user_id)
        elsif @current_user_role == 'client'
          @current_user = Client.find(@current_user_id)
        end

        render json: @current_user 
      end

    end
  end
end