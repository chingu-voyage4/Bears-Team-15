import { app, server } from '../server/app'
import * as seed from '../server/seed/modules'

import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

beforeAll(async () => {
  await seed.resetAllCollections()
  await seed.populateCollections()
})

afterAll(server.close())

describe('GET `/collections/public`', () => {

})
