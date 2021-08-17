class AddFilesToStaffs < ActiveRecord::Migration[6.1]
  def change
    add_column :staffs, :files, :text
  end
end
