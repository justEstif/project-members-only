# Project: Members Only

- members can write anonymous posts
- members of clubhouse can see who the author of the post is

# models

## User

### Model

model User {
  firstName string
  lastName string
  userName string
  password string
  profilePic string
  role enum(admin, member, user) default user
}

- membership-status
  - admin
    - member + delete msg
  - member
    - user + can see who posted
  - user
    - can post

### Routes

- GET /user/:id
  - go to user page: get all user messages and user info
  - the messages will have an update and edit message option
- POST /user
  - create user (validate and sanitize)
- UPDATE /user/:id
  - edit user info
  - edit username, email, password
- DELETE /user/:id
  - delete user
  - admin or user can delete user

### Schema
TODO Message schema

## Message

### Model

model Message {
  title: string
  createdAt: datetime
  updatedAt: datetime
  text: string
  userID: string
}

### Schema
TODO Message schema
### Route
- GET /message
  - get messages
  - if member or admin   -> get username as well
  - else only messages
- POST /message
  - write message
  - protected route: only users or above are allowed
- DELETE /message/:id
  - delete message if admin or user
  - protected route
- UPDATE /message/:id
  - update message if user


## Middleware

- getUser -> check if jwt has user
  - and store the user

A message has one user, a user can have many messags
User -> message == many to one relation
