class CreateClinicStructures < ActiveRecord::Migration[6.1]
  def change
    create_table :clinic_structures do |t|
      t.belongs_to :bank_account
      t.belongs_to :superadmin
      t.belongs_to :client
      t.belongs_to :employee_state
      t.belongs_to :clinic_address
      t.string     :early_start
      t.string     :early_end
      t.string     :middle_start
      t.string     :middle_end
      t.string     :late_start
      t.string     :late_end
      t.timestamps
    end
  end
end
