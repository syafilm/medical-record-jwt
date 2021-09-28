class CreateBankAccounts < ActiveRecord::Migration[6.1]
  def change
    create_table :bank_accounts do |t|
      t.string     :bankname
      t.string     :iban
      t.string     :bic
      t.string     :account_holder
      t.belongs_to :superadmin
      t.belongs_to :staff
      t.belongs_to :client
      t.timestamps
    end
  end
end
