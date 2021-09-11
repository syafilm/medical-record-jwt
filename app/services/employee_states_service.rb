class EmployeeStatesService
  def initialize(superadmin, params)
    @entry = params[:entry]
    @exit = params[:exit]
    @contract = params[:contract]
    @superadmin = superadmin
  end

  def perform_create
    EmployeeState.new(
      entry: @entry, 
      exit: @exit,
      contract: @contract,
      superadmin_id: @superadmin.id
    )
  end

  def object_create(employee_state)
    employee_state.entry = @entry if @entry.present?
    employee_state.exit = @exit if @exit.present?
    employee_state.contract = @contract if @contract.present?
    employee_state.superadmin_id = @superadmin.id if @superadmin.present?
    employee_state
  end  
end
