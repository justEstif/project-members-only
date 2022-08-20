# Project: Members Only

## Goals

- In this project you’ll be building an exclusive clubhouse where your members can write anonymous posts.
- Inside the clubhouse, members can see who the author of a post is, but outside they can only see the story and wonder who wrote it.

## Using

- Express, Mongodb, Typescript
- Pug, Tailwind

<!-- TODO: Remove output.css from gitignore -->

## Directions

<pre>
model User {
  string full_name {
    string first_name
    string last_name
  }
  string email {
    to serve as username
    to be used on sign up and log-in
  }
  string password {
      passport js
      bcryptjs
  }
  string membership-status {
    see if user is logged in?
  }
  virtual url {
    return /user/:id
  }
. createMessage()
}
</pre>

<pre>
model Message {
  string title
  string body
  objectID senderID {
    sender user id
  }
  date timestamp
  date timestamp_formatted {
    user friendly using luxon
  }
  virtual url {
    return /user/:id
  }
}
</pre>

- Setup your database on Mongo
- Setup models
    "@types/bcryptjs": "^2.4.2",
    "bcryptjs": "^2.4.3",
