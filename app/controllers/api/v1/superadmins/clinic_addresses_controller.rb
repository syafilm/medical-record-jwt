module Api
  module V1
    module Superadmins
      class ClinicAddressesController < Api::V1::BaseController
        before_action :authenticate_superadmin!

        def update
          id = params['id']
          clinic_address = ClinicAddress.find_by(id: id)
          superadmin = current_superadmin
          superadmin_id = superadmin.present? ? superadmin.id : ''
          @clinic_address = ClinicAddressesService.new(superadmin, clinic_address_params).object_create(clinic_address)

          if @clinic_address.save
            render json: @clinic_address
          end
        end

        def detail
          id = params['id']
          @clinic_structure = ClinicStructure.find_by(id: id)
          render json: @clinic_structure, status: :ok
        end

        private

          def clinic_address_params
            params.require(:clinic_address).permit(
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
