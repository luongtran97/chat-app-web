import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  InputGroup,
  InputRightElement,
  Button } from '@chakra-ui/react'
import { useState } from 'react'

const SignUp = () => {
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [name,setName] = useState()
  const [email,setEmail] = useState()
  const [passWord,setPassWord] = useState()
  const [confirmPassWord,setConfirmPassWord] = useState()
  const [pic,setPic] = useState()
  const handleClick = () => setShow(!show)
  const handleClick1 = () => setShow1(!show1)
  const postDetail = (pic) => {
      console.log('🚀 ~ pic:', pic)
  }
  const handelSubmit = () => { }
  return (
    <VStack spacing='5px' color='black'>
      <FormControl id='first-name' isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder='Enter your name'
          onChange={(e) => { setName(e.target.value) }}
        />
      </FormControl>
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
      <FormControl id='password-confirm' isRequired>
        <FormLabel>Password Confirm</FormLabel>
        <InputGroup size='md'>
          <Input
            pr='4.5rem'
            type={show1 ? 'text' : 'password'}
            placeholder='Enter confirm password'
            onChange={(e) => { setConfirmPassWord(e.target.value) }}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick1}>
              {show1 ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id='picture' isRequired>
        <FormLabel>Picture</FormLabel>
        <Input
          type='file'
          p={1}
          accept='image/*'
          onChange={(e) => { postDetail(e.target.files[0]) }}
        />
      </FormControl>

      <Button
        marginTop={15}
        colorScheme='blue'
        width='100%'
        onClick={handelSubmit}
      >
        SignUp
      </Button>
    </VStack>
  )
}

export default SignUp