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
  string member {
    is the user a member or not?{:}
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
- Start with a sign-up form so you can get some users into your DB!
- Don’t forget to sanitize and validate the form fields and secure the passwords with bcrypt.
- You should add a confirmPassword field to your sign-up form and then validate it using a custom validator.
- Read how to do that here.
