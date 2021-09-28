import {base} from './api.base'

function create(data) {
  return base().post(`clients`, data)
}

function index(){
  return base().get(`clients`)
}

function detail(id){
  return base().get(`clients/${id}/detail`)
}

function update(id, data){
  return base().put(`clients/${id}/update`, data)
}

const Clients = {
  create,
  index,
  detail,
  update
}

export default Clients
