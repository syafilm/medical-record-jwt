class AddExtensionToDocuments < ActiveRecord::Migration[6.1]
  def change
    add_column :documents, :extension, :string
  end
end
