const tokenService = require( '../utils/tokenService' )

module.exports = async ( req, res, next ) => {
  // get the authorization header from the request
  const authHeader = req.get( 'Authorization' )

  // declare token, but don't run split function until authHeader is checked.
  let token 

  // if no auth header present, send back a 401
  if ( ! authHeader ) return next( new Error( 'unauthorized' ))

  token = authHeader.split(" ")[1]

  try {
    const decoded = await tokenService.verify( token )
    req.token     = decoded
    next()
  } catch (e) {
    next( new Error( 'unauthorized' ) )
  }
}
