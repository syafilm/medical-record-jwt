class StaffSerializer < ActiveModel::Serializer
  attributes :id, 
             :email, 
             :stf,
             :name,
             :surname,
             :phone,
             :superadmin_id, 
             :last_despatch,
             :created_at,
             :updated_at, 
             :avatar,
             :files
end
