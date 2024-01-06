export const getSender= (loggedUser, users, chatName) => {

  if (!users && !loggedUser) {
    return chatName
  } else {
    return users[0]?._id === loggedUser._id ? users[1]?.name :users[0]?.name
  }
}