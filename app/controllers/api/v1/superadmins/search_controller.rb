module Api
  module V1
    module Superadmins
      class SearchController < Api::V1::BaseController
        
        def search
          page = params['page']
          keyword = params['keyword']

          staffs = Staff.search(keyword)
          clients = Client.search(keyword)
          
          render json: {
            staffs: staffs, 
            clients: clients
          }
        end

      end
    end
  end
end