class PriceCondition < ApplicationRecord
  belongs_to :client
  belongs_to :superadmin
  belongs_to :price_setting
  belongs_to :job

  validates_uniqueness_of :price_setting_id, scope: :job_id

  # def sync_job(job)
  #   binding.pry
  # end
end
