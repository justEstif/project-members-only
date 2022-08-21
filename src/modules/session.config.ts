import endpoints from "../endpoints.config"
export default {
  secret: endpoints.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}
