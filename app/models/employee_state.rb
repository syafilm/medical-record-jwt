class EmployeeState < ApplicationRecord
  has_one :clinic_structure
  has_paper_trail
end
