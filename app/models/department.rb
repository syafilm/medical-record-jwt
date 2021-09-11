class Department < ApplicationRecord
  before_save :downcase_name
  after_validation :set_slug, only: [:create, :update]

  has_one :content_department
  has_one :staff, through: :content_department

  validates_uniqueness_of :slug

  private
    def downcase_name
      self.name.downcase
    end

    def set_slug
      self.slug = name.to_s.parameterize
    end
end
