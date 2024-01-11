import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  InputGroup,
  InputRightElement,
  Button,
  useToast
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { chatContext } from '~/Context/ChatProvider'
import { handelLoginApis } from '~/apis'
import { localService } from '~/config/localService'
const Login = () => {
  const toast = useToast()
  const [loadingLogin, setLoadingLogin] =useState(false)
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState()
  const [password, setPassWord] = useState()
  const handleClick = () => setShow(!show)
  const navigate = useNavigate()
  const { setUser } = useContext(chatContext)
  const handelSubmit = async() => {
    setLoadingLogin(true)
    if (!email || !password) {
      toast({
        title: 'Please Fill All The Feilds!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position:'bottom-left'
      })
      return
    }
    try {
      const { data } = await handelLoginApis({ email, password })
      toast({
        title: 'Login Sucessful!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position:'bottom-left'
      })
      setLoadingLogin(false)
      navigate('/chats')
      localService.setItem(data, 'USER_INFO')
      setUser(localService.getItem('USER_INFO'))
    } catch (error) {
      setLoadingLogin(false)
      toast({
        title: 'Error Occured',
        description: error?.response?.data.message,
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position:'bottom-left'
      })
    }
  }
  return (
    <VStack spacing='5px' color='black'>
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          value={email}
          placeholder='Enter your email'
          onChange={(e) => { setEmail(e.target.value) }}
        />
      </FormControl>
      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size='md'>
          <Input
            value={password}
            pr='4.5rem'
            type={show ? 'text' : 'password'}
            placeholder='Enter password'
            onChange={(e) => { setPassWord(e.target.value) }}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        marginTop={15}
        colorScheme='blue'
        width='100%'
        onClick={handelSubmit}
        isLoading={loadingLogin}
      >
        Login
      </Button>
      <Button
        width='100%'
        colorScheme='red'
        variant='solid'
        onClick={() => { setEmail('guest@example.com'); setPassWord('Guest1234.') }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  )
}

export default Login