import {basic} from './api.base'

function detail() {
  return basic().get(`users/detail`)
}

const Users = {
  detail,
}

export default Users
