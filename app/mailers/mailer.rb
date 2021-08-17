class Mailer < ActionMailer::Base
  default from: ENV["DEFAULT_EMAIL"]
  layout 'mailer'
  
  def send_default_password_staff
    @staff = params[:staff]
    @default_password = params[:default_password]
    
    mail to: @staff.email,
    subject: "Hello this is your default password"
  end
end