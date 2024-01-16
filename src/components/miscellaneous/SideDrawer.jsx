import { useContext, useState } from 'react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { chatContext } from '~/Context/ChatProvider'
import { localService } from '~/config/localService'
import { useNavigate } from 'react-router-dom'
import ProfileModal from './ProfileModal'
import ChatLoading from './ChatLoading'
import { accessChatApis, handelSearchApis } from '~/apis'
import UsersList from '~/components/UserAvatar/UsersList'
import { getSender } from '~/config/Chatlogic'
import NotificationBadge, { Effect } from 'react-notification-badge'

const SideDrawer = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] =useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState(false)
  const { user, setSelectedChat, chat, setChat, notification, setNotification } = useContext(chatContext)
  console.log('🚀 ~ notification:', notification)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handelLogout = () => {
    localService.removeItem('USER_INFO')
    navigate('/')
  }
  const handelSearch = async() => {
    if (!search) {
      toast({
        title: 'Please Enter something to search!',
        status: 'warning',
        duration: 1000,
        isClosable: true,
        position:'bottom-left'
      })
      return
    }
    try {
      setLoading(true)
      const { data } = await handelSearchApis(search, user)
      setSearchResult(data)
      setLoading(false)
    } catch (error) {
      toast({
        title: 'Error Occured!',
        status: 'warning',
        duration: 1000,
        isClosable: true,
        position:'bottom-left'
      })
      setLoading(false)
    }
  }
  const accessChat = async(userId) => {
    try {
      setLoadingChat(true)
      const { data } = await accessChatApis(userId, user)
      if (!chat.find(c => c._id === data._id)) { setChat([data, ...chat])}
      setLoadingChat(false)
      setSelectedChat(data)
      onClose()
    } catch (error) {
      toast({
        title: 'Error fetching chat!',
        status: 'warning',
        duration: 1000,
        isClosable: true,
        position:'bottom-left'
      })
      setLoading(false)
    }
  }
  return (
    <>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        bg='white'
        w='100%'
        p='5px 10px'
        borderWidth='5px'
      >
        <Tooltip
          label='Search Users To Chat'
          hasArrow
          placement='bottom-end'
        >
          <Button variant='ghost' onClick={onOpen}>
            <i className='fas fa-search'></i>
            <Text display={{ base:'none', md:'flex' }} px={4} >
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize='2xl' fontFamily='Work sans'>
          Talk-A-Tive
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge count={notification.length} effect={Effect.SCALE}/>
              <BellIcon fontSize='2xl' m={1}/>
            </MenuButton>
            <MenuList textAlign='center'>
              {!notification.length && 'No New Messages'}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat)
                    setNotification(notification.filter((n) => n !== notif))
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
              <Avatar size='sm' cursor='pointer' name={user?.name} src={user?.picture}/>
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider/>
              <MenuItem onClick={handelLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottom='1px'>Search User</DrawerHeader>
          <DrawerBody>
            <Box display='flex' pb={2}>
              <Input
                placeholder='Seach Users by name'
                value={search}
                mr={2}
                onChange={(e) => { setSearch(e.target.value) }}
              />
              <Button onClick={handelSearch}>Go</Button>
            </Box>
            {loading ?
              (<ChatLoading/>) :
              ( searchResult?.map(( user ) => {
                return <UsersList
                  key={user?._id}
                  user={user}
                  handelFunction = { () => {accessChat(user?._id) }}
                />
              }) ) }
            {loadingChat && <Spinner ml='auto' display='flex'/>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideDrawer