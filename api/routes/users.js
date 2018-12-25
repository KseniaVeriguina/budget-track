// routes/user.js
const express      = require( 'express' )
const router       = express.Router();
const auth         = require( '../middleware/auth' )
const findUserById = require( '../middleware/findUserById' )

router.get( '/me', auth, findUserById, async ( req, res, next ) => {
	res.status( 200 ).send( { data: [req.user] } )
});

exports.router = router;
