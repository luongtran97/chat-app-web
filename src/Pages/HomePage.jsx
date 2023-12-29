import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel } from '@chakra-ui/react'
import Login from '~/components/Authentication/Login'
import SignUp from '~/components/Authentication/SignUp'

const HomePage = () => {
  return (
    <Container maxW='xl' centerContent>
      <Box
        display='flex'
        justifyContent='center'
        p={3}
        bg='white'
        w='100%'
        m='40px 0 15px 0'
        borderRadius='lg'
        borderWidth='1px'
      >
        <Text
          fontSize='4xl'
          fontFamily='Work sans'
          color='black'
        >Login
        </Text>
      </Box>
      <Box
        background='white'
        w='100%'
        p={4}
        borderRadius='lg'
        borderWidth='1px'
      >
        <Tabs variant='soft-rounded'>
          <TabList mb='1em'>
            <Tab width='50%'>Login</Tab>
            <Tab width='50%'>SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* Login Form*/}
              <Login/>
            </TabPanel>
            <TabPanel>
              {/* SignUp Form*/}
              <SignUp/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default HomePage