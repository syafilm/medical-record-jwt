import {basic} from './api.base'

function create(data, handleUploadProgress) {
  return basic(handleUploadProgress).post(`documents`, data)
}

// type is model
function list(id, type, upload_type){
  return basic().get(`documents/${id}/list?type=${type}&upload_type=${upload_type}`)
}

function destroy(id){
  return basic().delete(`documents/${id}`)
}

const Documents = {
  create,
  list,
  destroy
}

export default Documents
