module Api
  module V1
    module Superadmins
      class StaffsController < Api::V1::BaseController
        before_action :authenticate_superadmin!
        
        def index
          page = params['page']
          superadmin = current_superadmin
          superadmin_id = superadmin.present? ? superadmin.id : ''
          
          @staffs = Staff.all.page(page).order(created_at: :asc)
          render json: @staffs, status: :ok
        end

        def create
          safe_token = "#{Digest::SHA1.hexdigest([Time.now, rand].join)}#"
          additional_params = { password: safe_token }
          new_params = staff_params.reverse_merge!(additional_params)
          superadmin = current_superadmin
          staff = StaffsService.new(superadmin, new_params).perform_create
          if staff.save
            if staff_params[:tag_arr].present?
              staff.sync_tags(staff_params[:tag_arr], []) 
            end
            if staff_params[:department].present?
              staff.sync_department(staff_params[:department], '')
            end
            @staff = staff
            Mailer.with(staff: staff, default_password: safe_token).send_default_password_staff.deliver
            render json: @staff, status: :created
          end
        end

        def update
          id = params['id']
          superadmin = current_superadmin
          superadmin_id = superadmin.present? ? superadmin.id : ''
          staff = Staff.find_by(id: id)
          @staff = StaffsService.new(superadmin, staff_params).object_create(staff)

          if @staff.save
            sync_tags(id, staff_params[:tag_arr]) if staff_params[:tag_arr].present?
            sync_qualifications(id, staff_params[:qualification_arr]) if staff_params[:qualification_arr].present?
          end

          render json: @staff
        end

        def detail
          id = params['id']
          superadmin = current_superadmin
          superadmin_id = superadmin.present? ? superadmin.id : ''
          @staff = Staff.find_by(id: id)
          render json: @staff
        end

        private
          def sync_tags(id, tag_arr)
            staff = Staff.find_by(id: id)
            existing_tag_ids = ContentTag.where(staff_id: id).collect(&:id)
            tag_slugs = Tag.where(id: existing_tag_ids).collect(&:slug)
            tag_slugs_new = tag_arr.map{ |item|  item.to_s.parameterize}
            delete_tag_slugs =  tag_slugs.reject { |item| tag_slugs_new.include? item}
            staff.sync_tags(tag_arr, delete_tag_slugs)
          end

          def sync_qualifications(id, qualification_arr)
            staff = Staff.find_by(id: id)
            existing_qualification_ids = ContentQualification.where(staff_id: id).collect(&:id)
            qualification_slugs = Qualification.where(id: existing_qualification_ids).collect(&:slug)
            qualification_slugs_new = qualification_arr.map{ |item|  item.to_s.parameterize}
            delete_qualification_slugs =  qualification_slugs.reject { |item| qualification_slugs_new.include? item}
            staff.sync_qualifications(qualification_arr, delete_qualification_slugs)
          end

          def staff_params
            params.require(:staff).permit(
              :name,
              :surname,
              :email,
              :phone,
              :department,
              :avatar,
              files: [],
              tag_arr: [],
              qualification_arr: []
            )
          end
        end

    end
  end
end