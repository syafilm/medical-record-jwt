module Api
  module V1
    module Superadmins
      class ContactsController < Api::V1::BaseController
        before_action :authenticate_superadmin!

        def update
          id = params['id']
          contact = Contact.find_by(id: id)
          superadmin = current_superadmin
          superadmin_id = superadmin.present? ? superadmin.id : ''
          @contact = ContactsService.new(superadmin, contact_params).object_create(contact)

          if @contact.save
            render json: @contact
          end
        end

        def list
          contacts = Contact.all
          serialized_data_contacts = contacts.map{|a| { value: a.slug, label: a.name }}
          render json: serialized_data_contacts
        end

        private

          def contact_params
            params.require(:contact).permit(
              :email,
              :phone,
            )
          end
        end

    end
  end
end
