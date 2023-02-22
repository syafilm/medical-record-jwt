class CreateJobs < ActiveRecord::Migration[6.1]
  def change
    create_table :jobs do |t|
      t.string :name, null: false, default: ""
      t.string :slug, null: false, default: ""
      t.timestamps
    end

    add_index :jobs, :slug, unique: true
  end
end
