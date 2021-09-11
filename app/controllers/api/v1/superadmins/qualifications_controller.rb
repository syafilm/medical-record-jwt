module Api
  module V1
    module Superadmins
      class QualificationsController < Api::V1::BaseController
        before_action :authenticate_superadmin!

        def list
          qualifications = Qualification.all
          serialized_data_qualification = qualifications.map{|a| { value: a.slug, label: a.name }}
          render json: serialized_data_qualification
        end
        
      end
    end
  end
end
