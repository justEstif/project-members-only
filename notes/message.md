# Messages

## Routes

- Get messages
- Get message
- Post message
- Delete message
- Update message

## Middlewares

- Check if there is a logged in user
  - check the role
    - to create message
    - to see or not see the author of the messages
  - check if the message is the users
    - to allow or prevent delete, update
      - if user id === message id, allow delete, update
      - if user === ADMIN, allow delete (not update)

## Schema

### Create message

message {
text: string
}

router.post("/message", [checkUser, validate(newMessageSchema)], createMessage)
