class ClinicStructureSerializer < ActiveModel::Serializer
  attributes :id, 
             :bank_account_id,
             :superadmin_id,
             :staff_id,
             :employee_state_id,
             :streetname,
             :streetnumber,
             :zip_code,
             :region,
             :country,
             :company_name,
             :ceo_owner,
             :website,
             :phone_clinic
end
