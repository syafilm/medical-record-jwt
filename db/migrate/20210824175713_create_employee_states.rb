class CreateEmployeeStates < ActiveRecord::Migration[6.1]
  def change
    create_table :employee_states do |t|
      t.datetime     :entry
      t.datetime     :exit
      t.datetime     :contract
      t.timestamps
    end
  end
end