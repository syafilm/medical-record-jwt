import {base} from './api.base'

function update(id, data){
  return base().put(`price_settings/${id}/update`, data)
}

const PriceSettings = {
  update,
}

export default PriceSettings
