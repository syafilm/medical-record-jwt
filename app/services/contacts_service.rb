class ContactsService
  def initialize(superadmin, params)
    @superadmin = superadmin
    @name = params[:name]
    @email = params[:email]
    @phone = params[:phone]
  end

  def perform_create
    Client.new(
      name: @name,
      email: @email,
      phone: @phone
    )
  end

  def object_create(contact)
    contact.name = @name if @name.present?
    contact.email = @email if @email.present?
    contact.phone = @phone if @phone.present?
    contact
  end  
end
