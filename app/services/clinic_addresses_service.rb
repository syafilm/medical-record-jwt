class ClinicAddressesService
  def initialize(superadmin, params)
    @superadmin = superadmin
    @client_id = params[:client_id]
    @streetname = params[:streetname]
    @streetnumber = params[:streetnumber]
    @zip_code = params[:zip_code]
    @region = params[:region]
    @country = params[:country]
    @company_name = params[:company_name]
    @website = params[:website]
    @phone_clinic = params[:phone_clinic]
    @ceo_owner = params[:ceo_owner]
  end

  def perform_create
    ClinicAddress.new(
      superadmin_id: @superadmin.id,
      client_id: @client_id,
      streetname: @streetname, 
      streetnumber: @streetnumber, 
      zip_code: @zip_code, 
      region: @region, 
      country: @country, 
      company_name: @company_name, 
      ceo_owner: @ceo_owner, 
      website: @website, 
      phone_clinic: @phone_clinic
    )
  end

  def object_create(clinic_address)
    clinic_address.superadmin_id = @bank_account_id if @bank_account_id.present?
    clinic_address.client_id = @client_id if @client_id.present?
    clinic_address.streetname = @streetname if @streetname.present?
    clinic_address.streetnumber = @streetnumber if @streetnumber.present?
    clinic_address.zip_code = @zip_code if @zip_code.present?
    clinic_address.region = @region if @region.present?
    clinic_address.country = @country if @country.present?
    clinic_address.company_name = @company_name if @company_name.present?
    clinic_address.ceo_owner = @ceo_owner if @ceo_owner.present?
    clinic_address.website = @website if @website.present?
    clinic_address.phone_clinic = @phone_clinic if @phone_clinic.present?
    clinic_address
  end
end
