import {base} from './api.base'

function list(){
  return base().get(`qualifications/list`)
}

const Qualifications = {
  list
}

export default Qualifications
