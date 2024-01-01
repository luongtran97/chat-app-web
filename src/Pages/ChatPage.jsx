import { useEffect, useState } from 'react'
import { fetchData } from '~/apis'

const ChatPage = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    fetchData().then(res => {setData(res?.data)})
  }, [])

  return (
    <div>{data?.map((item) => {
      return <p key={item._id}>{item.chatName}</p>
    })}
    </div>
  )
}

export default ChatPage