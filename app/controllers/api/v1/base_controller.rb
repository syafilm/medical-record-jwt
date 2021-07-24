module Api
  module V1
    class BaseController < ActionController::Base
      respond_to :json
      before_action :process_token
      protected

      def authenticate_user!(options = {})
        head :unauthorized unless signed_in?
      end

      def signed_in?
        @current_user_id.present?
      end

      def process_token
        if request.headers['Authorization'].present?
          begin
            jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1].remove('"'), Rails.application.secrets.secret_key_base).first
            @current_user_id = jwt_payload['id']
            @current_user_role = jwt_payload['role']
          rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError
            head :unauthorized
          end
        end
      end

    end
  end
end
