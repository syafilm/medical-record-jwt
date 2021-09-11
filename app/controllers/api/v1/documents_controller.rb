module Api
  module V1
    class DocumentsController < Api::V1::BaseController
      before_action :authenticate_user
      
      def list
        id = params['id']
        type = params['type']
        upload_type = params['upload_type']
        @documents = Document.where(model_id: id, model_type: type, upload_type: upload_type)
        render json: @documents, status: :ok
      end

      def create
        jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1].remove('"'), Rails.application.secrets.secret_key_base).first
        @current_user_role = jwt_payload['role']
        @current_user_id = jwt_payload['id']
        document = DocumentsService.new({role: @current_user_role, id: @current_user_id}, document_params).perform_create
        if document.save
          @document = document
          render json: @document, status: :created
        end
      end

      def destroy
        id = params['id']
        document = Document.find_by(id: id)
        if document.destroy
          @document = document
          render json: @document,  status: :ok
        end
      end


      private

        def document_params
          params.require(:document).permit(
            :file,
            :model_type,
            :model_id,
            :uuid,
            :upload_type
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