class Qualification < ApplicationRecord
  before_save :downcase_name
  after_validation :set_slug, only: [:create, :update]
  has_many :content_qualifications
  has_many :staffs, through: :content_qualifications
  validates_uniqueness_of :slug

  private
    def downcase_name
      self.name.downcase
    end

    def set_slug
      self.slug = name.to_s.parameterize
    end
end
