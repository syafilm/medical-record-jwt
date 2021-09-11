class ClinicStructure < ApplicationRecord
  belongs_to :staff
  belongs_to :bank_account
  belongs_to :employee_state
  belongs_to :superadmin
end
