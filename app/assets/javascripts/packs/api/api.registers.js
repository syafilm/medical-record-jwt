import {base} from './api.base'

function create(data) {
  return base().post(`register`, data)
}

const Registers = {
  create,
}

export default Registers
