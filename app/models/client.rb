class Client < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  paginates_per 12

  after_save  :prefix_alphabet,
              :create_employee_state,
              :create_bank_account,
              :create_clinic_address,
              :create_price_setting

  attr_accessor :tag_arr,
                :qualification_arr,
                :department

  has_many :content_tags, dependent: :destroy
  has_many :tags, through: :content_tags

  has_many :content_qualifications, dependent: :destroy
  has_many :qualifications, through: :content_qualifications
  
  #this should be has one, but i still working on it
  has_one  :content_department, dependent: :destroy
  has_one  :department, through: :content_department

  has_one  :content_contact, dependent: :destroy
  has_one  :contact, through: :content_contact

  has_one  :employee_state, dependent: :destroy
  has_one  :bank_account, dependent: :destroy
  has_one  :clinic_structure, dependent: :destroy
  has_one  :clinic_address, dependent: :destroy
  has_one  :price_setting, dependent: :destroy
         
  mount_uploader :avatar, AvatarUploader

  def sync_tags(arr, delete_arr)
    self.tags = arr.map { |any| Tag.find_or_create_by(name: any)}

    if delete_arr.present?
      tag_ids = Tag.where(slug: delete_arr).collect(&:id)
      ContentTag.where(tag_id: tag_ids).destroy_all
    end
  end

  def sync_department(department, old_department)
    self.department = Department.find_or_create_by(name: department)
    self.content_department = ContentDepartment.find_or_create_by(client_id: self.id, department_id: self.department.id)
    
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

  def self.search(query)
    where('lower(name) LIKE ?', "%#{query.downcase}%").order(created_at: :desc, name: :desc)
  end

  private
    def prefix_alphabet
      self.update_column(:cln, "cln-#{id}") # This will skip validation gracefully.
    end

    def create_employee_state
      if self.employee_state.blank?
        EmployeeState.create(superadmin_id: self.superadmin_id, client_id: self.id)
      end
    end

    def create_bank_account
      if self.bank_account.blank?
        BankAccount.create(superadmin_id: self.superadmin_id, client_id: self.id)
      end
    end

    def create_clinic_address
      if self.clinic_address.blank?
        ClinicAddress.create(superadmin_id: self.superadmin_id, client_id: self.id)
      end
    end

    def create_price_setting
      if self.price_setting.blank?
        PriceSetting.create(superadmin_id: self.superadmin_id, client_id: self.id)
      end
    end

    def generate_jwt
      JWT.encode({
        id: id,
        role: 'client', 
        exp: 30.days.from_now.to_i,
        color: '#5f8eef',
        background: '#c9d7f5'},
        Rails.application.secrets.secret_key_base)
    end
end
