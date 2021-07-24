function params(obj = {}) {
  const form = new FormData()
  const data = {
    email: obj.email,
    password: obj.password,
  }

  Object.keys(data).map((key) => form.append(`staff[${key}]`, data[key]))

  return form
}


const ModelStaff = {
  params
}

export default ModelStaff