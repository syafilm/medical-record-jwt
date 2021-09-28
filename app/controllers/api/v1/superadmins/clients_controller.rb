module Api
  module V1
    module Superadmins
      class ClientsController < Api::V1::BaseController
        before_action :authenticate_superadmin!
        
        def index
          page = params['page']
          superadmin = current_superadmin
          superadmin_id = superadmin.present? ? superadmin.id : ''
          
          @clients = Client.all.page(page).order(created_at: :asc)
          render json: @clients, status: :ok
        end

        def create
          safe_token = "#{Digest::SHA1.hexdigest([Time.now, rand].join)}#"
          additional_params = { password: safe_token }
          new_params = client_params.reverse_merge!(additional_params)
          superadmin = current_superadmin
          client = ClientsService.new(superadmin, new_params).perform_create
          if client.save
            #this code is for client actually
            employee_state = EmployeeState.find_by(client_id: client.id)
            bank_account = BankAccount.find_by(client_id: client.id)
            clinic_address = ClinicAddress.find_by(client_id: client.id)
            clinic_structure_params = {
              client_id: client.id,
              employee_state_id: employee_state.id,
              bank_account_id: bank_account.id,
              clinic_address_id: clinic_address.id
            }
            clinic_structure = ClinicStructuresService.new(superadmin, clinic_structure_params).perform_create
            clinic_structure.save

            if client_params[:tag_arr].present?
              client.sync_tags(client_params[:tag_arr], []) 
            end
            if client_params[:department].present?
              client.sync_department(client_params[:department], '')
            end
            @client = client
            Mailer.with(client: client, default_password: safe_token).send_default_password_client.deliver
            render json: @client, status: :created
          end
        end

        def update
          id = params['id']
          superadmin = current_superadmin
          superadmin_id = superadmin.present? ? superadmin.id : ''
          client = Client.find_by(id: id)
          @client = ClientsService.new(superadmin, client_params).object_create(client)

          if @client.save
            sync_department(id, client_params[:department]) if client_params[:department].present?
            sync_tags(id, client_params[:tag_arr]) if client_params[:tag_arr].present?
            sync_qualifications(id, client_params[:qualification_arr]) if client_params[:qualification_arr].present?
          end

          render json: @client
        end

        def detail
          id = params['id']
          superadmin = current_superadmin
          superadmin_id = superadmin.present? ? superadmin.id : ''
          @client = Client.find_by(id: id)
          render json: @client
        end

        private
          def sync_tags(id, tag_arr)
            client = Client.find_by(id: id)
            existing_tag_ids = ContentTag.where(client_id: id).collect(&:id)
            tag_slugs = Tag.where(id: existing_tag_ids).collect(&:slug)
            tag_slugs_new = tag_arr.map{ |item|  item.to_s.parameterize}
            delete_tag_slugs =  tag_slugs.reject { |item| tag_slugs_new.include? item}
            client.sync_tags(tag_arr, delete_tag_slugs)
          end

          def sync_qualifications(id, qualification_arr)
            client = Client.find_by(id: id)
            existing_qualification_ids = ContentQualification.where(client_id: id).collect(&:id)
            qualification_slugs = Qualification.where(id: existing_qualification_ids).collect(&:slug)
            qualification_slugs_new = qualification_arr.map{ |item|  item.to_s.parameterize}
            delete_qualification_slugs =  qualification_slugs.reject { |item| qualification_slugs_new.include? item}
            client.sync_qualifications(qualification_arr, delete_qualification_slugs)
          end

          def sync_department(id, department)
            client = Client.find_by(id: id)
            existing_department_ids = ContentDepartment.where(client_id: id).collect(&:id)
            department_slugs = Department.where(id: existing_department_ids).collect(&:slug)
            department_slugs_new = [department].map{ |item| item.to_s.parameterize}
            delete_department_slugs = department_slugs.reject { |item| department_slugs_new.include? item}
            client.sync_department(department, delete_department_slugs)
          end

          def client_params
            params.require(:client).permit(
              :name,
              :surname,
              :email,
              :phone,
              :department,
              :contact,
              :avatar,
              tag_arr: [],
              qualification_arr: []
            )
          end
        end

    end
  end
end