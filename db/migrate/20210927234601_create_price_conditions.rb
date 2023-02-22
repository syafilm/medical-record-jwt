class CreatePriceConditions < ActiveRecord::Migration[6.1]
  def change
    create_table :price_conditions do |t|
      t.belongs_to :client
      t.belongs_to :superadmin
      t.belongs_to :price_setting
      t.belongs_to :job
      t.decimal    :hourly_rate, precision: 10, scale: 2
      t.integer    :vat
      t.integer    :percentage_zero
      t.integer    :percentage_one
      t.integer    :percentage_two
      t.integer    :percentage_three
      t.timestamps
    end
  end
end
