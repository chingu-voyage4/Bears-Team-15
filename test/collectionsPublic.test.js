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
  it('should respond with collections', () =>
    chai.request(app)
      .get('/collections/public')
      .then(res => {
        const received = res.body

        // to have proper structure:
        expect(received).toBeDefined()
        expect(received).toHaveProperty('collections')
        expect(received.collections).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              collectionName: expect.any(String),
              id: expect.any(String),
              // N.B! "id", not "_id"
              items: expect.arrayContaining([
                expect.objectContaining({
                  q: expect.any(String),
                  a: expect.any(String),
                  _id: expect.any(String),
                }),
              ]),
            })
          ])
        )
      })
  )
})
