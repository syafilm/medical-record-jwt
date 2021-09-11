class CreateDocuments < ActiveRecord::Migration[6.1]
  def change
    create_table :documents do |t|
      t.string     :file
      t.string     :name
      t.integer    :size
      t.string     :description
      t.string     :model_type
      t.integer    :model_id
      t.belongs_to :superadmin
      t.belongs_to :client
      t.belongs_to :staff
      t.text       :uuid
      t.timestamps
    end
  end
end
