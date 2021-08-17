class ContentTag < ApplicationRecord
  belongs_to :tag
  belongs_to :staff, optional: true
  belongs_to :client, optional: true
end
