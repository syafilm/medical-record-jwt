module Api
  module V1
    module Superadmins
      class EmployeeStatesController < Api::V1::BaseController
        before_action :authenticate_superadmin!

        def update
          staff_id = params['id']
          employee_state = EmployeeState.find_by(staff_id: staff_id)
          superadmin = current_superadmin
          superadmin_id = superadmin.present? ? superadmin.id : ''
          @employee_state = EmployeeStatesService.new(superadmin, employee_state_params).object_create(employee_state)

          if @employee_state.save
            render json: @employee_state
          end
        end

        def detail
          staff_id = params['id']
          @employee_state = EmployeeState.find_by(staff_id: staff_id)
          render json: @employee_state, status: :ok
        end

        private

          def employee_state_params
            params.require(:employee_state).permit(
              :entry,
              :exit,
              :contract,
              :superadmin_id,
              :staff_id
            )
          end
        end

    end
  end
end