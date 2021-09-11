function params(obj) {
  const form = new FormData()
  const data = {
    file: obj?.file,
    model_type: obj?.modelType,
    model_id: obj?.modelId,
    uuid: obj?.uuid,
    upload_type: obj?.uploadType
  }
  
  Object.keys(data).map((key) => {
    return (
      form.append(`document[${key}]`, data[key])
    )
  })

  return form
}

const ModelDocument = {
  params,
}

export default ModelDocument