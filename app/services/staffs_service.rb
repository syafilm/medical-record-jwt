class StaffsService
  def initialize(superadmin, params)
    @superadmin = superadmin
    @email = params[:email]
    @phone = params[:phone]
    @name = params[:name]
    @surname = params[:surname]
    @password = params[:password]
    @avatar = params[:avatar]
    @files = params[:files]
  end

  def perform_create
    Staff.new(
      avatar: @avatar,
      email: @email,
      phone: @phone,
      name: @name,
      surname: @surname,
      password: @password,
      superadmin_id: @superadmin.id,
    )
  end

  def object_create(staff)
    staff.avatar = @avatar if @avatar.present?
    staff.email = @email if @email.present?
    staff.phone = @phone if @phone.present?
    staff.name = @name if @name.present?
    staff.surname = @surname if @surname.present?
    staff.password = @password if @password.present?
    staff.files = @files if @files.present?
    staff
  end  
end
