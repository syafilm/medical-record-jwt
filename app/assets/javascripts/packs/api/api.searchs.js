import {base} from './api.base'

function find(keyword){
  return base().get(`search/${keyword}`)
}

const Searchs = {
  find
}

export default Searchs
