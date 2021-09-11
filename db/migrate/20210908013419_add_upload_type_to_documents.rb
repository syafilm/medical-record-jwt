class AddUploadTypeToDocuments < ActiveRecord::Migration[6.1]
  def change
    add_column :documents, :upload_type, :string
  end
end
