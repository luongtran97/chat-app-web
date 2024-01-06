import { CloseIcon } from '@chakra-ui/icons'
import {
  Box
} from '@chakra-ui/react'

const UserBadgeItem = ({ user, handelFunction }) => {
  return (
    <Box
      px={2}
      py={1}
      borderRadius='lg'
      m={1}
      mb={2}
      onClick={handelFunction}
      variant='solid'
      background='purple'
      color='white'
      cursor='pointer'
    >
      {user.name}
      <CloseIcon pl={1}/>
    </Box>
  )
}

export default UserBadgeItem