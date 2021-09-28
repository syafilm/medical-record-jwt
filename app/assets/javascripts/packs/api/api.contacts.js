import {base} from './api.base'

function update(id, data){
  return base().put(`contacts/${id}/update`, data)
}

function list(){
  return base().get(`contacts/list`)
}

const Contacts = {
  update,
  list
}

export default Contacts
