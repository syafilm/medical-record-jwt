class EmployeeState < ApplicationRecord
  has_one :clinic_structure
  has_paper_trail
  
  belongs_to :staff, optional: true
  belongs_to :client, optional: true
end
