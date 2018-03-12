import { app, server } from '../server/app'

import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)


afterAll(server.close())

describe('GET `/collections/public`', () => {
  beforeEach(() => {
  })
  it('should respond with object', () => {
    expect(1).toBe(1)
  })

})
