# User

// user.routes.ts(/user)

router.get("/", checkAdmin,user.controller.getUsers)
router.get("/:id", checkCurrentUser,user.controller.getUser)
router.post("/", checkSchema,user.controller.register)
router.update("/:id", checkSchema,user.controller.update)
router.delete("/:id", checkAdmin or user,user.controller.delete)

// test routes
check if only valid users info is allowed for creating user
check what the response of invalid is


## Model

```
model User {
  id string
  firstName string
  lastName string
  userName string
  password string
  role enum(admin, member, user) default user
}
```

- store user images on : <Cloudinary>
  - nodejs: <https://cloudinary.com/documentation/node_integration#installation_and_setup>
  - javascript: <https://cloudinary.com/documentation/javascript_quick_start>
  - npm install cloudinary-core --save
  - `var cl = new cloudinary.Cloudinary({cloud_name: "doxxldojd", secure: true});`

  ```js
  // source <https://cloudinary.com/console/c-809d5640f518073b9a0de4c6fa564f/getting-started>
  // mine
  cloudinary.v2.uploader.upload(image, {public_id: image_id}, (err, result) => {
      if(err) console.log(err)
      else console.log(result)
    })

  // original
  cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
    { public_id: "olympic_flag" },
    function(error, result) {console.log(result); });
  ```

- membership-status
  - admin
    - member + delete msg
  - member
    - user + can see who posted
  - user
    - can post

## Routes

- when you send a valid create user info to post /user
  - it should create the user
  - test the post /user by sending a valid user interface
  - test the post /user by sending an valid user interface
    - what should it return?
  - validate using zod
    - what is the schema?
    - first name and last name must be alphabets only
    - username must be alphabets and numbers only
    - password must be atleast 8characters
    - confirm password must match
      - add bcrypt for hashing password
    - need  passport to register and login user ??

- POST /register

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

## Schema
TODO Message schema

- schema CreateUser

  - firstName alphabet only
  - lastName alphabet only
  - userName alphabet, number and . only
  - email unique email only
  - password string
