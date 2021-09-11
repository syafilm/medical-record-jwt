import {base} from './api.base'

function detail(id){
  return base().get(`employee_states/${id}/detail`)
}

function update(id, data){
  return base().put(`employee_states/${id}/update`, data)
}

const EmployeeStates = {
  detail,
  update
}

export default EmployeeStates
