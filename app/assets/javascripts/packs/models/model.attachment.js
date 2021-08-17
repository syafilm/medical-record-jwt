function params(obj) {
  const form = new FormData()
  const data = {
    file: obj?.file,
    model_type: obj?.modelType,
    model_id: obj?.modelId,
    uuid: obj?.uuid
  }
  
  Object.keys(data).map((key) => {
    return (
      form.append(`attachment[${key}]`, data[key])
    )
  })

  return form
}

const ModelAttachment = {
  params,
}

export default ModelAttachment