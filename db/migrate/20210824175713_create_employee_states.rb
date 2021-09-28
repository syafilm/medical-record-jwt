class CreateEmployeeStates < ActiveRecord::Migration[6.1]
  def change
    # workplaces
    create_table :employee_states do |t|
      t.datetime     :entry
      t.datetime     :exit
      t.datetime     :contract
      t.belongs_to   :superadmin
      t.belongs_to   :staff
      t.belongs_to   :client
      t.timestamps
    end
  end
end
