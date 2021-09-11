module Api
  module V1
    module Superadmins
      class DepartmentsController < Api::V1::BaseController
        before_action :authenticate_superadmin!

        def list
          departments = Department.all
          serialized_data_departments = departments.map{|a| { value: a.slug, label: a.name }}
          render json: serialized_data_departments
        end
        
      end
    end
  end
end
