import axios from "axios"
import { apiRoot } from "~/utils/constant" 

export const fetchData = async() => { 
  const response = await axios.get(`${apiRoot}/api/chat/`)
  return response
}