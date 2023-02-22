module Api
  module V1
    module Superadmins
      class PriceConditionsController < Api::V1::BaseController
        before_action :authenticate_superadmin!

        def list
          price_setting_id = params['price_setting_id']
          price_conditions = PriceCondition.where(price_setting_id: price_setting_id)
          @price_conditions = price_conditions
          render json: price_conditions
        end

        def create
          superadmin = current_superadmin
          job = Job.find_or_create_by(name: price_condition_params[:job])
          additional_params = { job_id: job.id }
          new_params = price_condition_params.reverse_merge!(additional_params)
          price_condition = PriceConditionsService.new(superadmin, new_params).perform_create
          if price_condition.save
            @price_condition = price_condition
            render json: @price_condition, status: :created
          end
        end

        def update
          id = params['id']
          superadmin = current_superadmin
          superadmin_id = superadmin.present? ? superadmin.id : ''
          price_condition = PriceCondition.find_by(id: id)
          @price_condition = PriceConditionsService.new(superadmin, price_condition_params).object_create(price_condition)
          if @price_condition.save
            sync_job(id, price_condition_params[:job]) if price_condition_params[:job].present?
            render json: @price_condition
          end
        end

        def destroy
          id = params['id']
          price_condition = PriceCondition.find_by(id: id)
          if price_condition.destroy
            @price_condition = price_condition
            render json: @price_condition,  status: :ok
          end
        end

        private
          def sync_job(id, job)
            superadmin = current_superadmin
            price_condition = PriceCondition.find_by(id: id)
            if price_condition.job.name != job
              thejob = Job.find_or_create_by(name: job)
              additional_params = {job_id: thejob.id}
              @price_condition = PriceConditionsService.new(superadmin, additional_params).object_create(price_condition)
              @price_condition.save
            end
          end

          def price_condition_params
            params.require(:price_condition).permit(
              :client_id,
              :superadmin_id,
              :price_setting_id,
              :job,
              :hourly_rate,
              :vat,
              :percentage_zero,
              :percentage_one,
              :percentage_two,
              :percentage_three
            )
          end

      end
    end
  end
end
