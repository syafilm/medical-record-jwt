class Tag < ApplicationRecord
  before_save :downcase_name
  after_validation :set_slug
  has_many :content_tags
  has_many :staffs, through: :content_tags
  validates_uniqueness_of :slug

  private
    def downcase_name
      self.name.downcase
    end

    def set_slug
      self.slug = name.to_s.parameterize
    end
end
