module Api
  module V1
    class StaffsController < Api::V1::BaseController
      before_action :authenticate_super_admin!
      
      def index
        page = params['page']
        super_admin = current_super_admin
        super_admin_id = super_admin.present? ? super_admin.id : ''
        
        staffs = Staff.all.page(page).order(created_at: :asc)
        serialized_data_staff = StaffSerializer.new(staffs, params: { super_admin_id: super_admin_id }).as_json['data']
        render json: serialized_data_staff

      end

      def create
        safe_token = "#{Digest::SHA1.hexdigest([Time.now, rand].join)}#"
        additional_params = { password: safe_token }
        new_params = staff_params.reverse_merge!(additional_params)
        super_admin = current_super_admin
        staff = StaffsService.new(super_admin, new_params).perform_create
        if staff.save
          if staff_params[:tag_arr].present?
            staff.sync_tags(staff_params[:tag_arr], []) 
          end
          if staff_params[:department].present?
            staff.sync_department(staff_params[:department], '') 
          end
          serialized_data_staff = StaffSerializer.new(staff, params: { super_admin_id: super_admin }).as_json['data']
          Mailer.with(staff: staff, default_password: safe_token).send_default_password_staff.deliver
          render json: serialized_data_staff, status: :created
        end
      end

      def update
        id = params['id']
        super_admin = current_super_admin
        super_admin_id = super_admin.present? ? super_admin.id : ''
        staff = StaffsService.new(super_admin, staff_params).object_create
        if staff.save
          sync_tags(id, staff_params[:tag_arr]) if staff_params[:tag_arr].present?
          sync_qualifications(id, staff_params[:qualification_arr]) if staff_params[:qualification_arr].present?
        end
      end

      def detail
        id = params['id']
        super_admin = current_super_admin
        super_admin_id = super_admin.present? ? super_admin.id : ''

        staff = Staff.find_by(id: id)
        serialized_data_staff = StaffSerializer.new(staff, params: { super_admin_id: super_admin_id }).as_json['data']
        render json: serialized_data_staff
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
            tag_arr: [],
            qualification_arr: []
          )
        end
    
    end
  end
end