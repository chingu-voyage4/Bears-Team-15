require('regenerator-runtime/runtime')
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET
const { User } = require('../models')
import errors from '../errMessages'

const authenticated = async (req, res, next) => {
  let msg = errors.notAuthorized

  try {
    const authHeader = req.header('authorization')
    if (!authHeader) throw 'invalidToken'
    const token = authHeader.split(' ')[1]
    if (!token) throw 'invalidToken'
    const decoded = jwt.verify(token, JWT_SECRET)
    if (!decoded) throw 'invalidToken'
    const user = await User.findById(decoded._id)
    if (!user) throw 'notAuthorized'
    req.user = user
    next()
  } catch (err) {
    if (err === 'invalidToken') msg = errors.login.invalidToken
    res.status(403).send(msg)
  }
}

export {
  authenticated,
}
