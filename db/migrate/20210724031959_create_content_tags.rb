class CreateContentTags < ActiveRecord::Migration[6.1]
  def change
    create_table :content_tags do |t|
      t.belongs_to :staff
      t.belongs_to :client
      t.belongs_to :tag
      t.timestamps
    end
  end
end
