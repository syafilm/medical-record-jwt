class AddAvatarToStaffs < ActiveRecord::Migration[6.1]
  def change
    add_column :staffs, :avatar, :text
  end
end
