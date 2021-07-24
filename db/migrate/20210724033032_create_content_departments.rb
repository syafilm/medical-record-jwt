class CreateContentDepartments < ActiveRecord::Migration[6.1]
  def change
    create_table :content_departments do |t|
      t.belongs_to :staff
      t.belongs_to :client
      t.belongs_to :department
      t.timestamps
    end
  end
end
