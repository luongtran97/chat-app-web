import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { chatContext } from '~/Context/ChatProvider'
import { getSender, getSenderFull } from '~/config/Chatlogic'
import ProfileModal from './ProfileModal'
import UpdateGroupChatModal from './UpdateGroupChatModal'
import { fetchMessageApis, sendMessageApis } from '~/apis'
import '~/components/Style.css'
import ScrollableChat from '../ScrollableChat'
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const toast = useToast()
  const { selectedChat, setSelectedChat, user } = useContext(chatContext)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [newMessage, setNewMessage] = useState()
  const handelSendMessage = async(e) => {
    // xử lý on key down khi người dùng bấm enter
    if (e.key === 'Enter' && newMessage)
      try {
        setNewMessage('')
        const { data } = await sendMessageApis( { content: newMessage, chatId: selectedChat._id }, user)
        setMessages([...messages, data])
      } catch (error) {
        toast({
          title: 'Error Occured!',
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position:'bottom-left'
        })
      }

  }
  const typingHandeler = (e) => {
    setNewMessage(e.target.value)
    //Typing Indicator Logic
  }
  const fetchMessages = async() => {
    if (!selectedChat) return
    try {
      setLoading(true)
      const { data } = await fetchMessageApis(selectedChat._id, user)
      setMessages(data)
      setLoading(false)
    } catch (error) {
      toast({
        title: 'Error Occured!',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position:'bottom-left'
      })
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchMessages()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat])
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
                <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages}/>
              </>) }
          </Text>
          <Box
            display='flex'
            overflowY='hidden'
            flexDirection='column'
            justifyContent='flex-end'
            p={3}
            background='#E8E8E8'
            w='100%'
            h='100%'
            borderRadius='lg'
          >
            { loading ? (
              <Spinner
                size='xl'
                w={20}
                h={20}
                alignSelf='center'
                margin='auto'
              />
            ) : (
              <div className='messages'>
                <ScrollableChat messages={messages}/>
              </div>
            ) }
            <FormControl onKeyDown={handelSendMessage} isRequired mt={3}>
              <Input
                variant='filled'
                placeholder='Enter a message'
                background='#E0E0E0'
                value={newMessage}
                onChange={typingHandeler}
              />
            </FormControl>
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