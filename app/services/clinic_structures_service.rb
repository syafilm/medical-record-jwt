class ClinicStructuresService
  def initialize(superadmin, params)
    binding.pry
    @superadmin = superadmin
    @bank_account_id = params[:bank_account_id]
    @staff_id = params[:staff_id]
    @employee_state_id = params[:employee_state_id]
    @streetname = params[:streetname]
    @streetnumber = params[:streetnumber]
    @zip_code = params[:zip_code]
    @region = params[:region]
    @country = params[:country]
    @company_name = params[:company_name]
    @ceo_owner = params[:ceo_owner]
    @website = params[:website]
    @phone_clinic = params[:phone_clinic]
  end

  def perform_create
    ClinicStructure.new(
      superadmin_id: @superadmin.id,
      bank_account_id: @bank_account_id,
      staff_id: @staff_id,
      employee_state_id: @employee_state_id,
      streetname: @streetname,
      streetnumber: @streetnumber,
      zip_code: @zip_code,
      region: @region,
      country: @country,
      company_name: @company_name,
      ceo_owner: @ceo_owner,
      website: @website,
      phone_clinic: @phone_clinic,
    )
  end

  def object_create(clinic_structure)
    clinic_structure.bank_account_id = @bank_account_id if @bank_account_id.present?
    clinic_structure.staff_id = @staff_id if @staff_id.present?
    clinic_structure.superadmin_id = @superadmin_id if @superadmin_id.present?
    clinic_structure.employee_state_id = @employee_state_id if @employee_state_id.present?
    clinic_structure.streetname = @streetname if @streetname.present?
    clinic_structure.streetnumber = @streetnumber if @streetnumber.present?
    clinic_structure.zip_code = @zip_code if @zip_code.present?
    clinic_structure.region = @region if @region.present?
    clinic_structure.country = @country if @country.present?
    clinic_structure.company_name = @company_name if @company_name.present?
    clinic_structure.ceo_owner = @ceo_owner if @ceo_owner.present?
    clinic_structure.website = @website if @website.present?
    clinic_structure.phone_clinic = @phone_clinic if @phone_clinic.present?
    clinic_structure
  end  
end
