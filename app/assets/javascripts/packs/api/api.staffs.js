import {base} from './api.base'

function create(data) {
  return base().post(`staffs`, data)
}

function index(){
  return base().get(`staffs`)
}

function detail(id){
  return base().get(`staffs/${id}/detail`)
}

function update(id, data){
  return base().put(`staffs/${id}/update`, data)
}

const Staffs = {
  create,
  index,
  detail,
  update
}

export default Staffs
