class PriceConditionSerializer < ActiveModel::Serializer
  attributes :id,
             :client_id,
             :superadmin_id,
             :price_setting_id,
             :hourly_rate,
             :vat,
             :percentage_zero,
             :percentage_one,
             :percentage_two,
             :percentage_three,
             :created_at,
             :updated_at,
             :job

  def job
    data =  object.try(:job)
    if data.present?
      { value: data.slug, label: data.name}
    else
      {}
    end
  end
end
