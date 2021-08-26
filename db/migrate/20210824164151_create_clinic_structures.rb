class CreateClinicStructures < ActiveRecord::Migration[6.1]
  def change
    create_table :clinic_structures do |t|
      t.belongs_to :bank_account
      t.belongs_to :superadmin
      t.belongs_to :staff
      t.belongs_to :employee_state
      t.text       :streetname
      t.text       :streetnumber
      t.text       :zip_code
      t.text       :region
      t.text       :country
      t.text       :company_name
      t.text       :ceo_owner
      t.text       :website
      t.text       :phone_clinic
      t.timestamps
    end
  end
end
