class ContentDepartment < ApplicationRecord
  belongs_to :department
  belongs_to :staff, optional: true  
  belongs_to :client, optional: true
end
