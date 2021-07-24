class CreateAddresses < ActiveRecord::Migration[6.1]
  def change
    create_table :addresses do |t|
      t.text :streetname
      t.integer :streetnumber
      t.integer :zip_code
      t.text :region
      t.text :country
      t.belongs_to :staff
      t.belongs_to :client
      t.timestamps
    end
  end
end
