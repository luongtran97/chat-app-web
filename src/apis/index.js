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
export const createGroupChatApis = async(data, user) => {
  const response = await axios.post(`${apiRoot}/api/chat/group`, data, { headers:{ Authorization: user.token } })
  return response
}
export const renameGroupChatApis = async(data, user) => {
  const response = await axios.put(`${apiRoot}/api/chat/rename`, data, { headers:{ Authorization: user.token } })
  return response
}
export const addUserToGroupChatApis = async(data, user) => {
  const response = await axios.put(`${apiRoot}/api/chat/groupadd`, data, { headers:{ Authorization: user.token } })
  return response
}
export const removeUserToGroupChatApis = async(data, user) => {
  const response = await axios.put(`${apiRoot}/api/chat/groupremove`, data, { headers:{ Authorization: user.token } })
  return response
}