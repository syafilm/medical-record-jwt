class StaffSerializer < ActiveModel::Serializer
  attributes :id,
             :email,
             :stf,
             :name,
             :surname,
             :phone,
             :superadmin_id,
             :last_despatch,
             :created_at,
             :updated_at,
             :avatar,
             :streetname,
             :streetnumber,
             :zip_code, 
             :region,
             :country,
             :tag,
             :qualification,
             :department,
             :bank_account,
             :employee_state

  def tag
    object.tags.map{|a| { value: a.slug, label: a.name }}
  end

  def qualification
    object.qualifications.map{|a| { value: a.slug, label: a.name }}
  end

  def department
    data = object.try(:content_department).try(:department)
    if data.present?
      { value: data.slug, label: data.name}
    else
      {}
    end
  end

  def bank_account
    BankAccount.find_by(staff_id: object.id)
  end

  def employee_state
    EmployeeState.find_by(staff_id: object.id)
  end

end
