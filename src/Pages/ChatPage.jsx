import { Box } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { chatContext } from '~/Context/ChatProvider'
import ChatBox from '~/components/miscellaneous/ChatBox'
import MyChats from '~/components/miscellaneous/MyChats'
import SideDrawer from '~/components/miscellaneous/SideDrawer'
import { localService } from '~/config/localService'

const ChatPage = () => {
  const navigate = useNavigate()
  // const { user, setUser } = useContext(chatContext)
  const [user, setUser] = useState()


  const [fetchAgain, setFetchAgain] = useState(false)
  useEffect(() => {
    setUser(localService.getItem('USER_INFO'))
  }, [])
  if (!user) {
    navigate('/')
  }
  return (
    <div style={{ width:'100%' }}>
      {user && <SideDrawer/>}
      <Box
        display='flex'
        justifyContent='space-between'
        w='100%'
        h='91.5vh'
        p='10px'
      >
        {user && <MyChats user={user} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
    </div>
  )
}

export default ChatPage