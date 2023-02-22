import {base} from './api.base'

function list(){
  return base().get(`jobs/list`)
}

const Jobs = {
  list
}

export default Jobs
