import {base} from './api.base'

function detail(id){
  return base().get(`clinic_addresses/${id}/detail`)
}

function update(id, data){
  return base().put(`clinic_addresses/${id}/update`, data)
}

const ClinicAddresses = {
  detail,
  update
}

export default ClinicAddresses
