import axios from 'axios'
import { apiRoot } from '~/utils/constant'

const config = {
  headers: {
    'Content-type': 'application/json'
  }
}

export const fetchData = async() => {
  const response = await axios.get(`${apiRoot}/api/chat/`)
  return response
}

export const handelSignUpApis = async(data) => {
  const response = await axios.post(`${apiRoot}/api/user/signUp/`, data, config)
  return response
}
export const handelLoginApis = async(data) => {
  const response = await axios.post(`${apiRoot}/api/user/login/`, data)
  return response
}
export const handelSearchApis = async(search, user) => {
  const response = await axios.get(`${apiRoot}/api/user?search=${search}`, { headers:{ Authorization: user.token } })
  return response
}
export const accessChatApis = async(userId, user) => {
  const response = await axios.post(`${apiRoot}/api/chat`, { userId }, { headers:{ 'Content-type': 'application/json', Authorization: user.token } })
  return response
}
export const fetchChatsApis = async(user) => {
  const response = await axios.get(`${apiRoot}/api/chat`, { headers:{ Authorization: user.token } })
  return response
}