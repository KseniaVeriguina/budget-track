const { SECRET } = require( './constants' )
const jwt        = require( 'jsonwebtoken' )

const create = user => {
  const id = user._id

  const payload = {
    user: {
      id
    }
  }

  return jwt.sign( payload, SECRET )
}

const verify = token => jwt.verify( token, SECRET )

module.exports = {
  create,
  verify
}