class Superadmin < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_one :clinic_structure

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
         
  def generate_jwt
    JWT.encode({
      id: id,
      role: 'superadmin',
      exp: 60.days.from_now.to_i,
      color: '#4b988b',
      background: '#c3ece5'},
      Rails.application.secrets.secret_key_base)
  end
end
