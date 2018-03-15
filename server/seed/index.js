import dotenv from 'dotenv'
import connect from '../mongoose'
import { seed } from './modules'

dotenv.config()
connect(process.env.MONGODB_URI)
seed()
