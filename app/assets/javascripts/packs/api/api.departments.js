import {base} from './api.base'

function list(){
  return base().get(`departments/list`)
}

const Departments = {
  list
}

export default Departments
