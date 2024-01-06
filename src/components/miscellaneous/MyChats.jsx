import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { chatContext } from '~/Context/ChatProvider'
import { fetchChatsApis } from '~/apis'
import { localService } from '~/config/localService'
import ChatLoading from './ChatLoading'
import { getSender } from '~/config/Chatlogic'
import GroupChatModal from './GroupChatModal'

const MyChats = ({ user } ) => {
  const [loggedUser, setLoggedUser] = useState()
  const { selectedChat, setSelectedChat, chat, setChat } = useContext(chatContext)
  console.log('🚀 ~ chat:', chat)
  const toast = useToast()
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const { data } = await fetchChatsApis(user)
        setChat(data)
      } catch (error) {
        toast({
          title: 'Error fetching chat!',
          status: 'warning',
          duration: 1000,
          isClosable: true,
          position: 'bottom-left'
        })
      }
    }
    setLoggedUser(localService.getItem('USER_INFO'))
    fetchChat()
  }, [])


  return (
    <Box
      display={{ base:selectedChat ? 'none' : 'flex', md: 'flex' }}
      flexDirection='column'
      alignItems='center'
      p={3}
      bg='white'
      w={{ base: '100%', md:'31%' }}
      borderRadius='lg'
      borderWidth='1px'
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base:'28px', md:'30px' }}
        fontFamily='Work sans'
        display='flex'
        w='100%'
        justifyContent='space-between'
        alignItems='center'
      >
        My Chats
        <GroupChatModal>
          <Button
            fontSize={{ base:'17px', md:'10px', lg:'17px' }}
            rightIcon={<AddIcon/>}
          > Create new group chat
          </Button>
        </GroupChatModal>
      </Box>

      <Box
        display='flex'
        flexDirection='column'
        p={3}
        bg='#F8F8F8'
        w='100%'
        h='100%'
        borderRadius='lg'
        overflowY='hidden'
      >
        {chat ? (
          <Stack overflowY='scroll'>
            {chat?.map((chat) => {
              return <Box
                onClick={() => { setSelectedChat(chat)}}
                cursor='pointer'
                bg={selectedChat === chat ? '#38B2AC' : '#E8E8E8'}
                color={selectedChat === chat ? 'white' : 'black'}
                px={3}
                py={2}
                borderRadius='lg'
                key={chat?._id}
              >
                <Text key={chat._id}>
                  {chat.chatName}
                </Text>
              </Box>
            })}
          </Stack>
        ) : (<ChatLoading/> )}
      </Box>
    </Box>
  )
}

export default MyChats