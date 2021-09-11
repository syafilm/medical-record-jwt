function checkExist(value, label = '', withLabel = false) {
  let isValid
  if (/^\s*$/.test(value)) {
    isValid = false
  } else if (/^\d+$/.test(value)) {
    isValid = value > 0
  } else if (/^\s+$/.test(value)) {
    isValid = value.length > 0
  } else {
    isValid = !!value
  }


  if(withLabel){
    return isValid ? '' : `${label} must be filled in`
  }

  return isValid
}

function checkEmail(value, label) {
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  let isValid = false
  if (pattern.test(String(value))) {
    isValid = true
  }

  return isValid ? '' : `${label} must an email format`
}

function file(data){
  let isValid = true

  if (data.includes('jpg')
     || data.includes('jpeg')
     || data.includes('png')
     || data.includes('gif')) {
       isValid = false
  }

  return isValid ? '' : 'file should be image'  
}

function image(data) {
  let isValid = false
  if (data.includes('jpg')
     || data.includes('jpeg')
     || data.includes('png')
     || data.includes('gif')) {
       isValid = true
  }

  return isValid ? '' : 'file should be image'
}

const Validation = {
  checkExist,
  checkEmail,
  image,
  file
}

export default Validation