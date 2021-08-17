module Api
  module V1
    class AttachmentsController < Api::V1::BaseController
      before_action :authenticate_user
      
      def list
        id = params['id']
        type = params['type']
        @attachments = Attachment.where(model_id: id, model_type: type)
        render json: @attachments, status: :ok
      end

      def create
        jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1].remove('"'), Rails.application.secrets.secret_key_base).first
        @current_user_role = jwt_payload['role']
        @current_user_id = jwt_payload['id']
        attachment = AttachmentsService.new({role: @current_user_role, id: @current_user_id}, attachment_params).perform_create
        if attachment.save
          @attachment = attachment
          render json: @attachment, status: :created
        end

      end


      private

        def attachment_params
          params.require(:attachment).permit(
            :file,
            :model_type,
            :model_id,
            :uuid
          )
        end

        def authenticate_user
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

          if @current_user.present?
            true
          else
            render json: {}, status: :unauthorized
          end
        end
    end
  end
end