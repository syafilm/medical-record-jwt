class PriceConditionsService
  def initialize(superadmin, params)
    @superadmin = superadmin
    @client_id = params[:client_id]
    @price_setting_id = params[:price_setting_id]
    @job_id = params[:job_id]
    @hourly_rate = params[:hourly_rate]
    @vat = params[:vat]
    @percentage_zero = params[:percentage_zero]
    @percentage_one = params[:percentage_one]
    @percentage_two = params[:percentage_two]
    @percentage_three = params[:percentage_three]
  end

  def perform_create
    PriceCondition.new(
      client_id: @client_id,
      price_setting_id: @price_setting_id,
      job_id: @job_id,
      hourly_rate: @hourly_rate,
      vat: @vat,
      percentage_zero: @percentage_zero,
      percentage_one: @percentage_one,
      percentage_two: @percentage_two,
      percentage_three: @percentage_three,
      superadmin_id: @superadmin.id
    )
  end

  def object_create(price_condition)
    price_condition.client_id = @client_id if @client_id.present?
    price_condition.price_setting_id = @price_setting_id if @price_setting_id.present?
    price_condition.job_id = @job_id if @job_id.present?
    price_condition.hourly_rate = @hourly_rate if @hourly_rate.present?
    price_condition.vat = @vat if @vat.present?
    price_condition.percentage_zero = @percentage_zero if @percentage_zero.present?
    price_condition.percentage_one = @percentage_one if @percentage_one.present?
    price_condition.percentage_two = @percentage_two if @percentage_two.present?
    price_condition.percentage_three = @percentage_three if @percentage_three.present?
    price_condition.superadmin_id = @superadmin.id if @superadmin.present?
    price_condition
  end
end
