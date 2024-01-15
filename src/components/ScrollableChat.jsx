import { Avatar, Tooltip } from '@chakra-ui/react'
import { useContext } from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { chatContext } from '~/Context/ChatProvider'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '~/config/Chatlogic'

const ScrollableChat = ({ messages }) => {
  const { user } = useContext(chatContext)
  return (
    <ScrollableFeed>
      {messages && messages.map((mes, index) => {
        return <div style={{ display:'flex' }} key={index}>
          {
            (isSameSender(messages, mes, index, user._id)
            || isLastMessage(messages, index, user._id)
            ) && (
              <Tooltip
                label={mes.sender[0].name}
                placement='bottom-start'
                hasArrow
              >
                <Avatar
                  mt='7px'
                  mr={1}
                  size='sm'
                  cursor='pointer'
                  name={mes.sender[0].name}
                  src={mes.sender[0].picture}
                />
              </Tooltip>
            )
          }
          <span
            style={{ backgroundColor:`${mes.sender[0]._id === user._id ? '#BEE3F8' : '#B9F5D0' }`,
              borderRadius:'20px',
              padding:'5px 15px',
              maxWidth:'75%',
              marginLeft:isSameSenderMargin(messages, mes, index, user._id),
              marginTop: isSameUser(messages, mes, index, user._id) ? 3 : 10
            }}>
            {mes.content}
          </span>
        </div>
      })}
    </ScrollableFeed>
  )
}

export default ScrollableChat