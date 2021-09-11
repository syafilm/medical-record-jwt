class CreateDepartments < ActiveRecord::Migration[6.1]
  def change
    create_table :departments do |t|
      t.string :name, null: false, default: ""
      t.string :slug, null: false, default: ""
      t.timestamps
    end

    add_index :departments, :slug, unique: true
  end
end
