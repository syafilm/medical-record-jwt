import {base} from './api.base'

function list(){
  return base().get(`tags/list`)
}

const Tags = {
  list
}

export default Tags
