class PriceSettingsService
  def initialize(superadmin, params)
    @superadmin = superadmin
    @client_id = params[:client_id]
    @notes = params[:notes]
    @vat_nr = params[:vat_nr]
  end

  def perform_create
    PriceSetting.new(
      client_id: @client_id,
      notes: @notes,
      vat_nr: @vat_nr,
      superadmin_id: @superadmin.id
    )
  end

  def object_create(price_setting)
    price_setting.client_id = @client_id if @client_id.present?
    price_setting.notes = @notes if @notes.present?
    price_setting.vat_nr = @vat_nr if @vat_nr.present?
    price_setting.superadmin_id = @superadmin.id if @superadmin.present?
    price_setting
  end
end
