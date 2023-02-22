module Api
  module V1
    module Superadmins
      class PriceSettingsController < Api::V1::BaseController
        before_action :authenticate_superadmin!

        def update
          id = params['id']
          superadmin = current_superadmin
          superadmin_id = superadmin.present? ? superadmin.id : ''
          price_setting = PriceSetting.find_by(id: id)
          @price_setting = PriceSettingsService.new(superadmin, price_setting_params).object_create(price_setting)
          if @price_setting.save
            render json: @price_setting
          end

        end

        private
          def price_setting_params
            params.require(:price_setting).permit(
              :client_id,
              :superadmin_id,
              :notes,
              :vat_nr
            )
          end

      end
    end
  end
end
