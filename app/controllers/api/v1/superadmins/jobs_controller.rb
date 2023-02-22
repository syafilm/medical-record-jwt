module Api
  module V1
    module Superadmins
      class JobsController < Api::V1::BaseController
        before_action :authenticate_superadmin!

        def list
          jobs = Job.all
          serialized_data_jobs = jobs.map{|a| { value: a.slug, label: a.name }}
          render json: serialized_data_jobs
        end
        
      end
    end
  end
end
