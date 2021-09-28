class ClinicStructure < ApplicationRecord
  attr_accessor :contact

  belongs_to :bank_account
  belongs_to :employee_state
  belongs_to :superadmin
  belongs_to :client
  belongs_to :clinic_address

  has_one  :content_contact, dependent: :destroy
  has_one  :contact, through: :content_contact

  def sync_contact(contact, old_contact)
    self.contact = Contact.find_or_create_by(name: contact)
    self.content_contact = ContentContact.find_or_create_by(client_id: self.client_id, contact_id: self.contact.id, clinic_structure_id: self.id)
    
    if old_contact.present?
      contact_ids = Contact.where(slug: old_contact).collect(&:id)
      ContentContact.where(contact_id: contact_ids).destroy_all
    end
  end
  
end
