import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, IconButton, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { chatContext } from '~/Context/ChatProvider'
import { getSender, getSenderFull } from '~/config/Chatlogic'
import ProfileModal from './ProfileModal'
import UpdateGroupChatModal from './UpdateGroupChatModal'

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, user } = useContext(chatContext)

  return (
    <>
      {selectedChat
        ? <>
          <Text
            textAlign='right'
            fontSize={{ base:'28px', md:'30px' }}
            fontFamily='Work sans'
            display='flex'
            alignItems='center'
            w='100%'
            pb={3}
            px={2}
            justifyContent={{ base: 'space-between' }}
          >
            <IconButton
              display={{ base: 'flex', md:'none' }}
              icon={<ArrowBackIcon/>}
              onClick={() => { setSelectedChat('') }}
            />
            {!selectedChat.isGroupChat
              ?(<>{getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)}/>
              </>)
              : (<>
                {selectedChat?.chatName.toUpperCase()}
                <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
              </>) }
          </Text>
          <Box
            display='flex'
            overflowY='hidden'
            justifyContent='flex-end'
            p={3}
            background='#E8E8E8'
            w='100%'
            h='100%'
            borderRadius='lg'
          >

          </Box>
        </>
        : <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          h='100%'
        >
          <Text
            fontSize='3xl'
            pb={3}
            fontFamily='Works sans'
          >
            Click on a user to start chatting
          </Text>
        </Box> }
    </>
  )
}

export default SingleChat