class StaffsService
  def initialize(superadmin, params)
    @superadmin = superadmin
    @email = params[:email]
    @phone = params[:phone]
    @name = params[:name]
    @surname = params[:surname]
    @password = params[:password]
    @avatar = params[:avatar]
    @streetname = params[:streetname]
    @streetnumber = params[:streetnumber]
    @zip_code = params[:zip_code]
    @region = params[:region]
    @country = params[:country]
  end

  def perform_create
    Staff.new(
      avatar: @avatar,
      email: @email,
      phone: @phone,
      name: @name,
      surname: @surname,
      password: @password,
      streetname: @streetname,
      streetnumber: @streetnumber,
      zip_code: @zip_code,
      region: @region,
      country: @country,
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
    staff.streetname = @streetname if @streetname.present?
    staff.streetnumber = @streetnumber if @streetnumber.present?
    staff.zip_code = @zip_code if @zip_code.present?
    staff.region = @region if @region.present?
    staff.country = @country if @country.present?
    staff
  end
end
