function params(obj = {}) {
  const form = new FormData()
  const data = {
    email: obj.email,
    password: obj.password,
  }

  Object.keys(data).map((key) => form.append(`superadmin[${key}]`, data[key]))

  return form
}


const ModelSuperadmin = {
  params
}

export default ModelSuperadmin