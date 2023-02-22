class ClientSerializer < ActiveModel::Serializer
  attributes :id,
             :email,
             :cln,
             :name,
             :surname,
             :phone,
             :superadmin_id,
             :created_at,
             :updated_at,
             :avatar,
             :tag,
             :qualification,
             :department,
             :clinic_structure,
             :price_setting

  def tag
    object.tags.map{|a| { value: a.slug, label: a.name }}
  end

  def qualification
    object.qualifications.map{|a| { value: a.slug, label: a.name }}
  end

  def department
    data = object.try(:content_department).try(:department)
    if data.present?
      { value: data.slug, label: data.name}
    else
      {}
    end
  end

  def clinic_structure
    ClinicStructure.find_by(client_id: object.id)
  end

  def price_setting
    object.price_setting
  end

end
