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
import io from 'socket.io-client'
import { ENDPOINT } from '~/utils/constant'
import Lottie from 'lottie-react'
import animation from '../../animation/typingAnimation.json'
var socket, selectedChatCompare
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const toast = useToast()
  const [socketConnected, setSocketConnected] = useState(false)
  const { selectedChat, setSelectedChat, user, notification, setNotification } = useContext(chatContext)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [newMessage, setNewMessage] = useState()
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  useEffect(() => {
    fetchMessages()
    selectedChatCompare = selectedChat
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat])
  // xử lý socket.io
  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit('setup', user)
    socket.on('connected', () => setSocketConnected(true) )
    socket.on('typing', () => setIsTyping(true ))
    socket.on('stop typing', () => setIsTyping(false ))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    socket.on('message recieved', (newMessageRecieved) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
        // hiện thông báo
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification])
          setFetchAgain(!fetchAgain)
        }
      } else {
        setMessages([...messages, newMessageRecieved])
      }
    })
  })
  const handelSendMessage = async(e) => {
    // xử lý on key down khi người dùng bấm enter
    if (e.key === 'Enter' && newMessage)
      try {
        socket.emit('stop typing', selectedChat._id)
        setNewMessage('')
        const { data } = await sendMessageApis( { content: newMessage, chatId: selectedChat._id }, user)
        socket.emit('new message', data)
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
    //   xử lý quá trình typing
    if (!socketConnected) return
    if (!typing) {
      setTyping(true)
      socket.emit('typing', selectedChat._id)
    }

    let lastTypingTime = new Date().getTime()
    var timerLength = 800
    setTimeout(() => {
      var timeNow = new Date().getTime()
      var timeDiff = timeNow - lastTypingTime
      if (timeDiff >= timerLength && typing) {
        socket.emit('stop typing', selectedChat._id)
        setTyping(false)
      }
    }, timerLength)
  }
  const fetchMessages = async() => {
    if (!selectedChat) return
    try {
      setLoading(true)
      const { data } = await fetchMessageApis(selectedChat._id, user)
      setMessages(data)
      setLoading(false)
      socket.emit('join chat', selectedChat._id)
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
              {isTyping ?
                <div>
                  <Lottie animationData={animation} style={{ width:'50px', height:'50px' }} loop={true} />
                </div> : <></> }
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
            Click on a user to start chating
          </Text>
        </Box> }
    </>
  )
}

export default SingleChat