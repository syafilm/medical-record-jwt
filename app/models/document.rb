class Document < ApplicationRecord
  mount_uploader :file, DocumentUploader
end
