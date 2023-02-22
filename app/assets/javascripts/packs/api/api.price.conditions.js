import {base} from './api.base'

function create(data){
  return base().post(`price_conditions`, data)
}

function list(id){
  return base().get(`price_conditions/list?price_setting_id=${id}`)
}

function update(id, data){
  return base().put(`price_conditions/${id}/update`, data)
}

function destroy(id){
  return base().delete(`price_conditions/${id}`)
}

const PriceConditions = {
  create,
  list,
  update,
  destroy
}

export default PriceConditions
