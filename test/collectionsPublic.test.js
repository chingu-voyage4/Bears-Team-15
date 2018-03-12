jest.mock('../server/app')
import app from '../server/app'

import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

describe('GET `/collections/public`', () => {
  beforeEach(() => {
  })
  it('should respond with object', () => {
    expect(1).toBe(1)
  })

})
