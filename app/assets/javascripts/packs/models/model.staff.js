function params(obj) {
  const form = new FormData()
  const data = {
    name: obj?.name || '', 
    surname: obj?.surname || '', 
    email: obj?.email || '',
    password: obj?.password || '',
    phone: obj?.phone || '',
    avatar: obj?.avatar || '',
    files: obj?.temporaryFiles,
    qualification_arr: obj?.qualification.map(any => any.value),
    tag_arr: obj?.tag.map(any => any.value),
    department: Object.keys(obj?.department).length > 0 ? obj?.department?.value : ''
  }

  Object.keys(data).map((key) => {
    if (key === 'files') {
      return (
        Array.from(data.files).map(f => form.append('staff[files][]', f))
      )
    } else if (key === 'tag_arr') {
      return (
        Array.from(data.tag_arr).map(t => form.append('staff[tag_arr][]', t))
      )
    } else if(key === 'qualification_arr'){
      return (
        Array.from(data.qualification_arr).map(q => form.append('staff[qualification_arr][]', q))
      )
    }

    return (
      form.append(`staff[${key}]`, data[key])
    )

  })

  return form
}

function paramsFile(obj) {
  const form = new FormData()
  const data = {
    files: obj?.temporaryFiles,
  }

  Object.keys(data).map((key) => {
    if (key === 'files') {
      return (Array.from(data.files).map(f => form.append('staff[files][]', f)))
    }
    
    return (form.append(`staff[${key}]`, data[key]))
  })

  return form
}


const ModelStaff = {
  params,
  paramsFile
}

export default ModelStaff