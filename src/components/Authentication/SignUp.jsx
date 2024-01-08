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
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handelSignUpApis } from '~/apis'
import { localService } from '~/config/localService'
const SignUp = () => {
  const [loading, setLoading] =useState(false)
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassWord] = useState()
  const [confirmPassWord, setConfirmPassWord] = useState()
  const [pic, setPic] = useState()
  const navigate = useNavigate()
  const toast = useToast()
  const handleClick = () => setShow(!show)
  const handleClick1 = () => setShow1(!show1)
  const postDetail = (pic) => {
    if (pic === undefined) {
      toast({
        title: 'Please Select An Image!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position:'bottom-left'
      })
      return
    }
    if (pic.type === 'image/jpeg' || pic.type === 'image/png' || pic.type === 'image/jpg') {
      const data = new FormData()
      data.append('file', pic)
      // name of preset
      data.append('upload_preset', 'chat-app')
      data.append('api_key', '737262289732531')
      // name of could name
      data.append('cloud_name', 'luongtrandev')
      fetch('https://api.cloudinary.com/v1_1/luongtrandev/image/upload', {
        method:'post',
        body: data
      }).then(res => res.json())
        .then(data => {setPic(data.url.toString())})
        .catch(() => { })
    } else {
      toast({
        title: 'Please Select An Image!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position:'bottom-left'
      })
      
    }
  }
  const handelSubmit = async() => {
    if (!name || !email || !password || !confirmPassWord) {
      toast({
        title: 'Please Fill All The Feilds!',
        status: 'warning',
        duration: 8000,
        isClosable: true,
        position:'bottom-left'
      })
      return
    }
    // check password
    if (password !== confirmPassWord) {
      toast({
        title: 'Password do not match!',
        status: 'error',
        duration: 8000,
        isClosable: true,
        position:'bottom-left'
      })
      return
    }

    try {
      const data = {
        name,
        email,
        password,
        picture:pic
      }
      handelSignUpApis(data).then(() => {
        toast({
          title: 'Registration Sucessful!',
          status: 'success',
          duration: 8000,
          isClosable: true,
          position:'bottom-left'
        })
        localService.setItem(data, 'userInfo')
        navigate('/chats')
      })

    } catch (error) {
      toast({
        title: error.response?.data.message || null,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position:'bottom-left'
      })
    }
  }
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
      <FormControl id='picture'>
        <FormLabel>Picture</FormLabel>
        <Input
          type='file'
          p={1}
          accept='image/*'
          onChange={(e) => { postDetail(e.target.files[0]) }}
        />
      </FormControl>

      <Button
        isLoading={loading}
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