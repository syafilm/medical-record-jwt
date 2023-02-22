class Job < ApplicationRecord
  before_save :downcase_name
  after_validation :set_slug, only: [:create, :update]

  validates_uniqueness_of :slug

  has_many :price_condition

  private
    def downcase_name
      self.name.downcase
    end

    def set_slug
      self.slug = name.to_s.parameterize
    end
end
