module Api
  module V1
    module Superadmins
      class TagsController < Api::V1::BaseController
        before_action :authenticate_superadmin!

        def list
          tags = Tag.all
          serialized_data_tag = tags.map{|a| { value: a.slug, label: a.name }}
          render json: serialized_data_tag
        end
        
      end
    end
  end
end
