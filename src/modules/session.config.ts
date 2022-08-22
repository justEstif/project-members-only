import endpoints from "../endpoints.config"
export default {
  secret: endpoints.SESSION_SECRET,
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
}
