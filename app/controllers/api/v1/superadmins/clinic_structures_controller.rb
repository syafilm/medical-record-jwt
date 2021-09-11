module Api
  module V1
    module Superadmins
      class ClinicStructuresController < Api::V1::BaseController
        before_action :authenticate_superadmin!

        def update
          staff_id = params['id']
          clinic_structure = ClinicStructure.find_by(staff_id: staff_id)
          superadmin = current_superadmin
          superadmin_id = superadmin.present? ? superadmin.id : ''
          @clinic_structure = ClinicStructuresService.new(superadmin, clinic_structure_params).object_create(clinic_structure)

          if @clinic_structure.save
            render json: @clinic_structure
          end
        end

        def detail
          staff_id = params['id']
          @clinic_structure = ClinicStructure.find_by(staff_id: staff_id)
          render json: @clinic_structure, status: :ok
        end

        private

          def clinic_structure_params
            params.require(:clinic_structure).permit(
              :bank_account_id,
              :superadmin_id,
              :staff_id,
              :employee_state_id,
              :streetname,
              :streetnumber,
              :zip_code,
              :region,
              :country,
              :company_name,
              :ceo_owner,
              :website,
              :phone_clinic
            )
          end
        end

    end
  end
end