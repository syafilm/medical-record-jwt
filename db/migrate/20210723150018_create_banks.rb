class CreateBanks < ActiveRecord::Migration[6.1]
  def change
    create_table :banks do |t|
      t.text :bankname
      t.text :iban
      t.text :bic
      t.text :account_holder
      t.belongs_to :staff
      t.timestamps
    end
  end
end
