import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  InputGroup,
  InputRightElement,
  Button } from '@chakra-ui/react'
import { useState } from 'react'
const Login = () => {
  const [show, setShow] = useState(false)
  const [email,setEmail] = useState()
  const [passWord,setPassWord] = useState()
  const handleClick = () => setShow(!show)

  const handelSubmit = () => { }
  return (
    <VStack spacing='5px' color='black'>
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder='Enter your email'
          onChange={(e) => { setEmail(e.target.value) }}
        />
      </FormControl>
      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size='md'>
          <Input
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