const mongoose = require( 'mongoose' )
const Schema   = mongoose.Schema
const bcrypt   = require( 'bcryptjs' )

const userSchema = new Schema({
  email: {
    type: String,
    unique: true, // email is set to unique to prevent multiple signups with the same email
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

// before a new user is saved
userSchema.pre( 'save', async function( next ) {
  const user = this
  // if the user's password has changed since the last time the user was saved, or if this is a completely new user
  if ( user.isModified( 'password' ) || user.isNew ) {
    try {
      // hash their password
      const hash = await bcrypt.hash( user.password, 10 )
      // set their password to be equal to the hash
      user.password = hash
      next()
    } catch (e) {
      next(e)
    }
  } else {
    return next()
  }
})

// add a method to all users to be able to compare a password
userSchema.methods.comparePassword = function( password ) {
  // use bcrypt to compare a plaintext password to a hash
  return bcrypt.compare( password, this.password );
};

module.exports = mongoose.model( 'User', userSchema )