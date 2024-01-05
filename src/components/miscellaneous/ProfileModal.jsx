import { ViewIcon } from '@chakra-ui/icons'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Button,
  IconButton,
  Image,
  Text
} from '@chakra-ui/react'

const ProfileModal = ({ user, children }) => {


  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      {children ? ( <span onClick={onOpen}> {children} </span> ) :( <IconButton display={{ base:'flex' }} icon={<ViewIcon/>} onClick={onOpen} />) }
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent height='410px'>
          <ModalHeader
            display='flex'
            justifyContent='center'
            fontSize='40px'
            fontFamily='Work sans'
          >
            {user?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
          >
            <Image
              borderRadius='full'
              boxSize='150px'
              src={user?.picture}
              alt={user?.name}
            />
            <Text
              fontSize={{ base:'28px', md:'30px' }}
              fontFamily='Work sans'
            >
              {user?.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal