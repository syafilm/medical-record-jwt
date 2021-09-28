class ContentContact < ApplicationRecord
  belongs_to :contact
  belongs_to :client
  belongs_to :clinic_address, optional: true  
  belongs_to :clinic_structure, optional: true
end
