class Address < ApplicationRecord
  belongs_to :staff
  
  validates_uniqueness_of :staff_id
end
