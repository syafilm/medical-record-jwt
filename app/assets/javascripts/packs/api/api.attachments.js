import {basic} from './api.base'

function create(data, handleUploadProgress) {
  return basic(handleUploadProgress).post(`attachments`, data)
}

// type is model
function list(id, type){
  return basic().get(`attachments/${id}/list?type=${type}`)
}

const Attachments = {
  create,
  list
}

export default Attachments
