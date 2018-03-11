jest.mock('../server/app')
import app from '../server/app'
import connect from '../server/mongoose'
const MONGODB_URI = process.env.MONGODB_URI + '-test'

describe('GET `/collections/public`', () => {
  beforeEach(() => {
  })
  it('should respond with object', () => {
    expect(1).toBe(1)
  })

})
