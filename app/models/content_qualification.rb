class ContentQualification < ApplicationRecord
  belongs_to :qualification
  belongs_to :staff, optional: true
  belongs_to :client, optional: true
end
