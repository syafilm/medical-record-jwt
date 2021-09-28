class CreateContacts < ActiveRecord::Migration[6.1]
  def change
    create_table :contacts do |t|
      t.string :name, null: false, default: ""
      t.string :slug, null: false, default: ""
      t.string :email
      t.string :phone
      t.timestamps
    end

    add_index :contacts, :slug, unique: true
  end
end
