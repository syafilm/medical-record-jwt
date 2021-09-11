import {base} from './api.base'

function detail(id){
  return base().get(`clinic_structures/${id}/detail`)
}

function update(id, data){
  return base().put(`clinic_structures/${id}/update`, data)
}

const ClinicStructures = {
  detail,
  update
}

export default ClinicStructures
