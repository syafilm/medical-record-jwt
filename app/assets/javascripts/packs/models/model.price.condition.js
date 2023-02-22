function params(obj) {
  const form = new FormData()
  const data = {
    client_id: obj.modelId,
    price_setting_id: obj.priceSettingId,
    job: Object.keys(obj?.job).length > 0 ? obj?.job?.label : '',
    hourly_rate: obj.hourlyRate,
    vat: obj.vat,
    percentage_zero: obj.percentageZero,
    percentage_one: obj.percentageOne,
    percentage_two: obj.percentageTwo,
    percentage_three: obj.percentageThree
  }
  
  Object.keys(data).map((key) => {
    return (
      form.append(`price_condition[${key}]`, data[key])
    )
  })

  return form
}

const ModelPriceCondition = {
  params,
}

export default ModelPriceCondition
