# Project: Members Only

## Goals

- In this project you’ll be building an exclusive clubhouse where your members can write anonymous posts.
- Inside the clubhouse, members can see who the author of a post is, but outside they can only see the story and wonder who wrote it.

## Using

- Express, Mongodb, Typescript
- Pug, Tailwind

<!-- TODO: Remove output.css from gitignore -->

## Instruction

1. Database models:

   - User:

     - firstName
     - lastName
     - fullName = firstName + lastName
     - username = email used for sign up
     - passwords = hashed byscrypt
     - membershipStatus: enum ["default", "club"]
     - admin = boolean = optional
       - if admin assign club as well

   - Message:

     - title
     - text
     - senderID
     - timestamp
     - timestampFormattted = user friendly luxon

2. Sign up page:

   - Form fields: sanitized and validated using `express-validator`:

     - firstName
     - lastName
     - email
     - password

   - confirm password: using [this](https://express-validator.github.io/docs/validation-chain-api.html)
   - assign membershipStatus

3. Join the club page:

   - Add a page where members can “join the club” by entering a secret passcode.
   - If they enter the passcode correctly, then update their membership status.
   <!-- IDEA: Create a separate document on the db that stores the hashed password. Compare user input against that  -->
   - Instead I use the env to store the value and just check the value against that.

4. Create a login-form using passport.js

   - When a user is logged in give them a link to “Create a new message” (but only show it if they’re logged in!).
   - Display all member messages on the home page, but only show the author and date of the messages to other club-members.

   - if user is logged in they can post messages

   - You’ll need to add a way to actually mark a user as an ‘admin’ so either add another secret pass-code page, or just put an “is admin” checkbox on the sign-up form.
   <!-- IDEA: Have an upgrade privilages page, where the user can join the club or admin if they know the passwords -->
   - if the user is an admin allow them to delete messages
   <!-- NOTE: Should there be a delete message page? -->

5. By this point, anyone who comes to the site should be able to see a list of all messages, with the author’s name hidden.

   - Users should be able to sign-up and create messages, but ONLY users that are members should be able to see the author and date of each message.
   - Finally, you should have an Admin user that is able to see everything and also has the ability to delete messages.
   - Obviously this is a simple and silly little app, but the things you are practicing (creating and authenticating users and giving users different abilities and permissions) are things that will be very useful to you!
   - When you’re satisfied with your work, deploy your project to heroku and share it below!

   <!-- QUESTION: should most of the control of what is able to be viewed be on the views or controller?  -->

| ---------------- | admin | club | member | not |
| ---------------- | ----- | ---- | ------ | --- |
| read message     | X     | X    | X      | X   |
| write message    | X     | X    | X      |     |
| view sender      | X     | X    |        |     |
| delete message   | X     |      |        |     |

## Sign In page

```js
// Setting up login page
app.get("/log-in", (_: Request, res: Response) => res.render("log-in"))

app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
)
```

## Writing Messages

1. Create the home page
    - Homepage
       - messages
       - form
        - input for message
        - submit input, pass value to db, get home page(reloads)
2. Create the write messages page
  - if there is a user show the form, else don't but still show the messages

- could we have home page have an input section at the bottom, that
- the home page(messages) get all the messages and shows them
- the home page has a form at the bottom, and the user can write a message in there and the post request is to add that message to db, and rerender the page
