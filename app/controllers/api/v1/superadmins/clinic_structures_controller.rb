module Api
  module V1
    module Superadmins
      class ClinicStructuresController < Api::V1::BaseController
        before_action :authenticate_superadmin!

        def update
          id = params['id']
          # superadmin = current_superadmin
          # superadmin_id = superadmin.present? ? superadmin.id : ''
          # staff = Staff.find_by(id: id)
          # @staff = StaffsService.new(superadmin, staff_params).object_create(staff)

          # if @staff.save
          #   sync_tags(id, staff_params[:tag_arr]) if staff_params[:tag_arr].present?
          #   sync_qualifications(id, staff_params[:qualification_arr]) if staff_params[:qualification_arr].present?
          # end

          # render json: @staff
        end

        def detail
          id = params['id']
          # superadmin = current_superadmin
          # superadmin_id = superadmin.present? ? superadmin.id : ''
          # @staff = Staff.find_by(id: id)
          # render json: @staff
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