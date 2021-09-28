class CreateContentContacts < ActiveRecord::Migration[6.1]
  def change
    create_table :content_contacts do |t|
      t.belongs_to :client
      t.belongs_to :contact
      t.belongs_to :clinic_address
      t.belongs_to :clinic_structure
      t.timestamps
    end
  end
end
