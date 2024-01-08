import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { chatContext } from '~/Context/ChatProvider'
import { createGroupChatApis, handelSearchApis } from '~/apis'
import UsersList from '../UserAvatar/UsersList'
import UserBadgeItem from '../UserAvatar/UserBadgeItem'

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [groupChat, setGroupChat] = useState()
  const [selectedUsers, setSelectedUsers] = useState([])
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const { user, chat, setChat } = useContext(chatContext)
  const toast = useToast()
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
  const handelSumbit = async() => {
    if (!groupChat || !selectedUsers) {
      toast({
        title: 'Please fill all the feilds!',
        status: 'warning',
        duration: 1000,
        isClosable: true,
        position:'bottom-left'
      })
      return
    }
    try {
      const dataToAdd = {
        name:groupChat,
        users:JSON.stringify(selectedUsers.map(user => user._id))
      }
      const { data } = await createGroupChatApis(dataToAdd, user)
      setChat([data, ...chat])
      onClose()
      toast({
        title: 'New Group Chat Created',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position:'bottom-left'
      })
      setSelectedUsers([])
    } catch (error) {
      toast({
        title: 'Fail to create new group chat',
        status: 'warning',
        duration: 1000,
        isClosable: true,
        position:'bottom-left'
      })
    }
  }
  const handelGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: 'User already added',
        status: 'warning',
        duration: 1000,
        isClosable: true,
        position:'bottom-left'
      })
      return
    }
    setSelectedUsers([...selectedUsers, userToAdd])
  }
  const handelDeleteUser = (delUser) => {
    setSelectedUsers(selectedUsers.filter((user) => user._id !== delUser._id))
  }
  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            textAlign='center'
            fontSize='35px'
            fontFamily='Work sans'
          >Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display='flex'
            alignItems='center'
            flexDirection='column'
          >
            <FormControl>
              <Input
                mb={3}
                type='text'
                placeholder='Chat Name'
                onChange={(e) => { setGroupChat(e.target.value) }}
              />
            </FormControl>
            <FormControl>
              <Input
                mb={1}
                type='text'
                placeholder='Add Users'
                onChange={(e) => { handelSearch(e.target.value) }}
              />
            </FormControl>
            {/* selected users */}
            <Box w='100%' display='flex' flexWrap='wrap' >
              {selectedUsers?.map((user) => {
                return <UserBadgeItem
                  key={user._id}
                  user={user}
                  handelFunction={() => { handelDeleteUser(user)
                  }}/>})}
            </Box>
            {/* render search users */}
            {loading ? <div> loading </div> :
              ( searchResult?.slice(0, 4).map((user) => {
                return <UsersList
                  user={user}
                  key={ user._id }
                  handelFunction={() => { handelGroup(user)
                  }}/> })) }
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handelSumbit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModal