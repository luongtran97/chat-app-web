import { Box } from '@chakra-ui/react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { chatContext } from '~/Context/ChatProvider'
import ChatBox from '~/components/miscellaneous/ChatBox'
import MyChats from '~/components/miscellaneous/MyChats'
import SideDrawer from '~/components/miscellaneous/SideDrawer'

const ChatPage = () => {
  const navigate = useNavigate()
  const { user } = useContext(chatContext)
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
        {user && <MyChats/>}
        {user && <ChatBox/>}
      </Box>
    </div>
  )
}

export default ChatPage