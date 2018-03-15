import mongoose from 'mongoose'

mongoose.Promise = global.Promise

export default function connect (dburl) {
  mongoose.connect(dburl)
    .then(() => console.log(`Connected to DB ${dburl}`))
    .catch(() => console.error('Error: unable to connect to DB'))
}
