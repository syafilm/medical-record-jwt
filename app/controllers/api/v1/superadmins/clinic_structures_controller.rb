module Api
  module V1
    module Superadmins
      class ClinicStructuresController < Api::V1::BaseController
        before_action :authenticate_superadmin!

        def update
          id = params['id']
          clinic_structure = ClinicStructure.find_by(id: id)
          superadmin = current_superadmin
          superadmin_id = superadmin.present? ? superadmin.id : ''
          @clinic_structure = ClinicStructuresService.new(superadmin, clinic_structure_params).object_create(clinic_structure)

          if @clinic_structure.save
            sync_contact(id, clinic_structure_params[:contact]) if clinic_structure_params[:contact].present?
            render json: @clinic_structure
          end
        end

        def detail
          client_id = params['id']
          @clinic_structure = ClinicStructure.find_by(client_id: client_id)
          render json: @clinic_structure, status: :ok
        end

        private
          def sync_contact(id, contact)
            clinic_structure = ClinicStructure.find_by(id: id)
            existing_contact_ids = ContentContact.where(clinic_structure: id).collect(&:id)
            contact_slugs = Contact.where(id: existing_contact_ids).collect(&:slug)
            contact_slugs_new = [contact].map{ |item| item.to_s.parameterize}
            delete_contact_slugs = contact_slugs.reject { |item| contact_slugs_new.include? item}
            clinic_structure.sync_contact(contact, delete_contact_slugs)
          end

          def clinic_structure_params
            params.require(:clinic_structure).permit(
              :bank_account_id,
              :superadmin_id,
              :client_id,
              :employee_state_id,
              :streetname,
              :streetnumber,
              :zip_code,
              :region,
              :country,
              :company_name,
              :ceo_owner,
              :website,
              :phone_clinic,
              :early_start,
              :early_end,
              :middle_start,
              :middle_end,
              :late_start,
              :late_end,
              :contact
            )
          end
        end

    end
  end
end