class ClinicAddress < ApplicationRecord
  has_one  :content_contact, dependent: :destroy
  has_one  :contact, through: :content_contact
end
