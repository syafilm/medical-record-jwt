class CreateWorkplaces < ActiveRecord::Migration[6.1]
  def change
    create_table :workplaces do |t|
      t.datetime :entry_date
      t.datetime :exit_date
      t.datetime :contract_until
      t.belongs_to :client
      t.belongs_to :staff
      t.timestamps
    end
  end
end
