const User = require( '../models/user' )

module.exports = async ( req, res, next ) => {
  const { id } = req.token.user
  try {
    const doc = await User.findById( id )
    if ( ! doc ) next( new Error( 'not found' ) )
    req.user = doc
    next()
  } catch ( e ) {
    next( new Error( e ) )
  }
}