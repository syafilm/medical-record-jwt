class ClinicStructuresService
  def initialize(superadmin, params)
    @superadmin = superadmin
    @bank_account_id = params[:bank_account_id]
    @client_id = params[:client_id]
    @employee_state_id = params[:employee_state_id]
    @clinic_address_id = params[:clinic_address_id]
    @early_start = params[:early_start]
    @early_end = params[:early_end]
    @middle_start = params[:middle_start]
    @middle_end = params[:middle_end]
    @late_start = params[:late_start]
    @late_end = params[:late_end]
  end

  def perform_create
    ClinicStructure.new(
      superadmin_id: @superadmin.id,
      bank_account_id: @bank_account_id,
      client_id: @client_id,
      employee_state_id: @employee_state_id,
      clinic_address_id: @clinic_address_id,
      early_start: @early_start,
      early_end: @early_end,
      middle_start: @middle_start,
      middle_end: @middle_end,
      late_start: @late_start,
      late_end: @late_end
    )
  end

  def object_create(clinic_structure)
    clinic_structure.bank_account_id = @bank_account_id if @bank_account_id.present?
    clinic_structure.client_id = @client_id if @client_id.present?
    clinic_structure.superadmin_id = @superadmin.id if @superadmin.present?
    clinic_structure.employee_state_id = @employee_state_id if @employee_state_id.present?
    clinic_structure.clinic_address_id = @clinic_address_id if @clinic_address_id.present?
    clinic_structure.early_start = @early_start if @early_start.present?
    clinic_structure.early_end = @early_end if @early_end.present?
    clinic_structure.middle_start = @middle_start if @middle_start.present?
    clinic_structure.middle_end = @middle_end if @middle_end.present?
    clinic_structure.late_start = @late_start if @late_start.present?
    clinic_structure.late_end = @late_end if @late_end.present?
    clinic_structure
  end
end
