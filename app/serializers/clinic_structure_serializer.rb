class ClinicStructureSerializer < ActiveModel::Serializer
  attributes :id, 
             :bank_account_id,
             :superadmin_id,
             :client_id,
             :employee_state_id,
             :clinic_address_id,
             :clinic_address,
             :employee_state,
             :bank_account,
             :early_start,
             :early_end,
             :middle_start,
             :middle_end,
             :late_start,
             :late_end,
             :department,
             :contact

  def employee_state
    employee_state = EmployeeState.find_by(client_id: object.client_id)
    {
      entry: employee_state.entry,
      exit: employee_state.exit,
      contract: employee_state.contract
    }
  end
  
  def clinic_address
    clinic_address = ClinicAddress.find_by(client_id: object.client_id)
    {
      streetnumber: clinic_address.streetnumber,
      streetname: clinic_address.streetname,
      zip_code: clinic_address.zip_code,
      region: clinic_address.region,
      country: clinic_address.country,
      company_name: clinic_address.company_name,
      ceo_owner: clinic_address.ceo_owner,
      website: clinic_address.website,
      phone_clinic: clinic_address.phone_clinic
    }
  end

  def bank_account
    bank_account = BankAccount.find_by(client_id: object.client_id)
    {
      bankname: bank_account.bankname,
      iban: bank_account.iban,
      bic: bank_account.bic,
      account_holder: bank_account.account_holder
    }
  end

  def department
    department_id = ContentDepartment.find_by(client_id: object.client_id).department_id
    data = Department.find_by(id: department_id)
    if data.present?
      { value: data.slug, label: data.name }
    else
      {}
    end
  end

  def contact
    data = object.try(:content_contact).try(:contact)
    if data.present?
      {
        id: data.id,
        object: {
          value: data.slug,
          label: data.name
        },
        email: data.email,
        phone: data.phone
      }
    else
      {}
    end
  end

end
