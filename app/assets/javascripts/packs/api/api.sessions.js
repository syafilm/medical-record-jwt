import {base} from './api.base'

function create(data) {
  return base().post(`login`, data)
}

const Sessions = {
  create,
}

export default Sessions
