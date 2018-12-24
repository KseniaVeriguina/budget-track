// routes/login.js
const express = require( 'express' );
const router  = express.Router();
const User    = require( '../models/user' )

router.post('/', async (req, res, next) => {
    // retrieve user and password from body
    const { email, password } = req.body;
    try {
      // find a matching user in our db by email addres
      const user = await User.findOne({ email })

      // no match, send back a not found error
      if (!user) return next(new Error('not found'))

      // compare a user's hash to the password sent in the HTTP request body
      const match = await user.comparePassword(password)

      // if they match
      if (match) {
        // send back the user
        res.status(200).send({ data: [user] })
      } else {
        // no match, send back a 401
        next(new Error('unauthorized'))
      }
    } catch (e) {
      // all other errors go to the handler
      next (e)
    }
  });

exports.router = router;