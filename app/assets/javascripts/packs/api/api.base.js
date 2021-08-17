import axios from 'axios'
import { cookies } from 'configs'
import { Jwt } from 'utils'

const API_URL = window.location.origin
const csrfToken = document.querySelector('[name="csrf-token"]')

const getRole = () => {
  if (JSON.parse(localStorage.getItem('role')) === null){
    return {role : ''}
  } 
  return JSON.parse(localStorage.getItem('role'))
}

const accessToken = () => {
  return cookies.getAccessToken() || null
}
const decode = () => {
  const token = accessToken()
  return Jwt.decode(token)
}

const config = () => {
  const tokenDecode = decode()
  return !tokenDecode ? {
    common: {
      'X-CSRF-Token': csrfToken.content,
    },
  } : {
    common: {
      'X-CSRF-Token': csrfToken.content,
    },
    Authorization: 'Bearer ' + accessToken()
  }
}

export const base = (uploadProgress) => {
  const {role} = getRole()
  return axios.create({
    baseURL: `${API_URL}/api/v1/${role}s/`,
    headers: config(),
  })
}

export const basic = (uploadProgress) => {
  return axios.create({
    baseURL: `${API_URL}/api/v1/`,
    headers: config(),
    onUploadProgress: uploadProgress,
  })
}
