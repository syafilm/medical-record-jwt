class Contact < ApplicationRecord
  after_validation :set_slug, only: [:create, :update]

  has_one :content_contact
  has_one :clinic_address, through: :content_contact
  has_one :clinic_structure, through: :content_contact

  validates_uniqueness_of :slug

  private
    def set_slug
      self.slug = name.to_s.parameterize
    end
end
