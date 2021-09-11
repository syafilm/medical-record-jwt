class DocumentSerializer < ActiveModel::Serializer
  attributes :id,
             :file,
             :name,
             :size,
             :description,
             :model_type,
             :model_id,
             :superadmin_id,
             :client_id,
             :staff_id,
             :uuid,
             :extension,
             :upload_type,
             :created_at,
             :updated_at
end
