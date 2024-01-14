import { ViewIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Button,
  useToast,
  Box,
  FormControl,
  Input,
  Spinner
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { chatContext } from '~/Context/ChatProvider'
import UserBadgeItem from '../UserAvatar/UserBadgeItem'
import { addUserToGroupChatApis, handelSearchApis, removeUserToGroupChatApis, renameGroupChatApis } from '~/apis'
import UsersList from '../UserAvatar/UsersList'

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, selectedChat, setSelectedChat } = useContext(chatContext)
  const [groupChatName, setGroupChatName] = useState()
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState()
  const [loading, setLoading] = useState(false)
  const [renameLoading, setRenameLoading] = useState(false)
  const toast = useToast()
  const handelRemove = async(user1) => {
    if ( selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast({
        title: 'Only Admin Can Remove SomeOne!',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position:'bottom-left'
      })
      return
    }
    try {
      setLoading(true)
      const { data } = await removeUserToGroupChatApis({ chatId: selectedChat._id, userId: user1._id }, user)
      user1._id === user._id ? setSelectedChat() : setSelectedChat(data)
      setFetchAgain(!fetchAgain)
      setLoading(false)
    } catch (error) {
      toast({
        title: 'Error Occured!',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position:'bottom-left'
      })
      setLoading(false)
    }
  }
  const handelRename = async() => {
    if (!groupChatName) return
    try {
      const dataToAdd = {
        chatId: selectedChat._id,
        chatName:groupChatName
      }
      setRenameLoading(true)
      const { data } = await renameGroupChatApis(dataToAdd, user)
      setSelectedChat(data)
      setFetchAgain(!fetchAgain)
      setRenameLoading(false)
      onClose()
    } catch (error) {
      toast({
        title: 'Error Occured!',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position:'bottom-left'
      })
      setRenameLoading(false)
    }
    setGroupChatName('')
  }
  const handelSearch = async(query) => {
    setSearch(query)
    if (!query) return
    try {
      setLoading(true)
      const { data } = await handelSearchApis(query, user)
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
  const handelAddUser = async(user1) => {
    if (selectedChat.users.find(u => u._id === user1._id)) {
      toast({
        title: 'User Already In Group!',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position:'bottom-left'
      })
      return
    }
    if ( selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: 'Only Admin Can Add SomeOne To Group!',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position:'bottom-left'
      })
      return
    }

    try {
      setLoading(true)
      const { data } = await addUserToGroupChatApis({ chatId: selectedChat._id, userId:user1._id }, user)
      setSelectedChat(data)
      setFetchAgain(!fetchAgain)
      fetchMessages()
      setLoading(false)
    } catch (error) {
      toast({
        title: 'Error Occured!',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position:'bottom-left'
      })
    }

  }
  return (
    <>
      <IconButton onClick={onOpen} icon={<ViewIcon/>} display={{ base:'flex' }}> Open modal</IconButton>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize='35px'
            fontFamily='Work sans'
            display='flex'
            justifyContent='center'
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display='flex'>
              {selectedChat?.users.map((u) => { return <UserBadgeItem key={u._id} user={u} handelFunction = {() => { handelRemove(u)}}/> })}
            </Box>
            <FormControl display='flex'>
              <Input
                placeholder='Chat Name'
                mb={3}
                value={groupChatName}
                onChange={(e) => { setGroupChatName(e.target.value) }}
              />
              <Button
                variant='solid'
                colorScheme='teal'
                ml={1}
                isLoading={renameLoading}
                onClick={handelRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder='Add User To Group'
                mb={1}
                onChange={(e) => {handelSearch(e.target.value) }}
              />
            </FormControl>
            {loading ? <Spinner/> : searchResult?.map((u) => { return <UsersList key={u._id} user={u} handelFunction={handelAddUser(u)}/> })}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={() => { handelRemove(user) }}>
              Leave Group
            </Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupChatModal