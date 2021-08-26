import {basic} from './api.base'

function create(data, handleUploadProgress) {
  return basic(handleUploadProgress).post(`attachments`, data)
}

// type is model
function list(id, type){
  return basic().get(`attachments/${id}/list?type=${type}`)
}

function destroy(id){
  return basic().delete(`attachments/${id}`)
}

const Attachments = {
  create,
  list,
  destroy
}

export default Attachments
