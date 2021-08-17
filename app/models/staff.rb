class Staff < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  paginates_per 12

  after_save :prefix_alphabet, 
             :create_address,
             :create_bank

  attr_accessor :tag_arr,
                :qualification_arr,
                :department
                # :streetname,
                # :streetnumber,
                # :zip_code,
                # :region,
                # :country,
                # :bankname,
                # :iban,
                # :bic,
                # :account_holder

  has_many :content_tags, dependent: :destroy
  has_many :tags, through: :content_tags

  has_many :content_qualifications, dependent: :destroy
  has_many :qualifications, through: :content_qualifications
  
  #this should be has one, but i still working on it
  has_many :content_departments, dependent: :destroy
  has_many :departments, through: :content_departments

  has_one :address
  has_one :bank

  has_many :workplaces
         
  mount_uploader :avatar, AvatarUploader

  mount_uploaders :files, FileUploader
  serialize :files, JSON

  def sync_tags(arr, delete_arr)
    self.tags = arr.map { |any| Tag.find_or_create_by(name: any)}

    if delete_arr.present?
      tag_ids = Tag.where(slug: delete_arr).collect(&:id)
      ContentTag.where(tag_id: tag_ids).destroy_all
    end
  end

  def sync_department(department, old_department)
    self.departments = [department].map { |any| Department.find_or_create_by(name: any)}
    
    if old_department.present?
      deparment_ids = Department.where(slug: old_department).collect(&:id)
      ContentDepartment.where(department_id: deparment_ids).destroy_all
    end
  end

  def sync_qualifications(arr, delete_arr)
    self.qualifications = arr.map { |any| Qualification.find_or_create_by(name: any)}
    
    if delete_arr.present?
      qualification_ids = Qualification.where(slug: delete_arr).collect(&:id)
      ContentQualification.where(qualification_id: qualification_ids).destroy_all
    end
  end

  private
    def prefix_alphabet
      self.update_column(:stf, "stf-#{id}") # This will skip validation gracefully.
    end

    def create_address
      if self.address.blank?
        Address.create(staff_id: id)
      end
    end

    def create_bank
      if self.bank.blank?
        Bank.create(staff_id: id)
      end
    end

    def generate_jwt
      JWT.encode({
        id: id, 
        role: 'staff', 
        exp: 30.days.from_now.to_i,
        color: '#b78913',
        background: '#FFE194'},
        Rails.application.secrets.secret_key_base)
    end

end
