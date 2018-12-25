// routes/user.js
const express      = require( 'express' )
const router       = express.Router();
const tokenService = require( '../utils/tokenService' )
const User         = require( '../models/user' )

router.get( '/me', async ( req, res, next ) => {

    // get the authorization header from the request
    const authHeader = req.get( 'Authorization' )

    // declare token, but don't run split function until authHeader is checked.
    let token 

    // if no auth header present, send back a 401
    if ( ! authHeader ) return next( new Error( 'unauthorized' ))

    token = authHeader.split(" ")[1]

	try {
		// try to decode it
		const decoded = await tokenService.verify( token )
		// if unable to decode it, send unauthorized
		if ( ! decoded ) throw new Error( 'unauthorized' )

		// grab user id off decoded token and use it to find a User in the db
		const user = await User.findById( decoded.user.id )

		// if no user is found, throw unauthorized
		if ( ! user ) throw new Error( 'unauthorized' )

		// if we made it this far, we must have found the user! send it back
		res.status(200).send( { data: [user] } )
	} catch ( e ) {
		next( e )
	}

  });

exports.router = router;
