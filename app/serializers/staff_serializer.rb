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
             :files,
             :streetname,
             :streetnumber,
             :zip_code, 
             :region,
             :country,
             :tag,
             :qualification,
             :department

  def tag
    object.tags.map{|a| { value: a.slug, label: a.name }}
  end

  def qualification
    object.qualifications.map{|a| { value: a.slug, label: a.name }}
  end

  def department
    data = object.content_department.department
    {
      value: data.slug,
      label: data.name,
    }
  end

end
