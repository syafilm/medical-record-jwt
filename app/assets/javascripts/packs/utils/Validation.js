function checkExist(value, label) {
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

  return isValid ? '' : `${label} must be filled in`
}

function checkEmail(value, label) {
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  let isValid = false
  if (pattern.test(String(value))) {
    isValid = true
  }

  return isValid ? '' : `${label} must an email format`
}

const Validation = {
  checkExist,
  checkEmail,
}

export default Validation