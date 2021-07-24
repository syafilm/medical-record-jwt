class CreateContentQualifications < ActiveRecord::Migration[6.1]
  def change
    create_table :content_qualifications do |t|
      t.belongs_to :staff
      t.belongs_to :clients
      t.belongs_to :qualification
      t.timestamps
    end
  end
end
