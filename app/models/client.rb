class Client < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

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
