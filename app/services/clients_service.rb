class ClientsService
  def initialize(superadmin, params)
    @superadmin = superadmin
    @email = params[:email]
    @phone = params[:phone]
    @name = params[:name]
    @surname = params[:surname]
    @password = params[:password]
    @avatar = params[:avatar]
  end

  def perform_create
    Client.new(
      avatar: @avatar,
      email: @email,
      phone: @phone,
      name: @name,
      surname: @surname,
      password: @password,
      superadmin_id: @superadmin.id
    )
  end

  def object_create(client)
    client.avatar = @avatar if @avatar.present?
    client.email = @email if @email.present?
    client.phone = @phone if @phone.present?
    client.name = @name if @name.present?
    client.surname = @surname if @surname.present?
    client.password = @password if @password.present?
    client
  end  
end
