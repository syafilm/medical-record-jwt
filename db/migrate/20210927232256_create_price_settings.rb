class CreatePriceSettings < ActiveRecord::Migration[6.1]
  def change
    create_table :price_settings do |t|
      t.belongs_to :client
      t.belongs_to :superadmin
      t.text :notes
      t.text :vat_nr
      t.timestamps
    end
  end
end
