import { app, server } from '../server/app'
import * as seed from '../server/seed/modules'
import errors from '../server/errMessages'

import chai from 'chai'
import chaiHttp from 'chai-http'
import { ObjectId } from 'mongodb'

chai.use(chaiHttp)

beforeAll(async () => {
  await seed.resetAllCollections()
})

afterAll(server.close())

describe('GET `/collections/public`', () => {
  const path = '/collections/public'
  it('should find no collections in empty DB', () =>
    seed.populateCollection({
      collectionName: 'notShared',
      items: []
    })
      .then(() => chai.request(app).get(path))
      .catch(err => {
        const res = err.response
        expect(res).toHaveProperty('status', 404)
        expect(res).toHaveProperty('text', errors.noPublicFound)
      })
  )

  it('should respond with collections', () =>
    seed.populateCollections()
      .then(() => chai.request(app).get(path))
      .then(res => {
        const received = res.body

        // to have proper structure:
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

        // id's are valid mongodb ObjectId
        expect(ObjectId.isValid(received.collections[0].id))
          .toBeTruthy()
        expect(ObjectId.isValid(received.collections[0].items[0]._id))
          .toBeTruthy()

        // only collections with property "shared" === ture
        const expectedNames = seed.collections
          .filter(x => x.shared === true)
          .map(x => x.collectionName)
        const receivedNames = received.collections
          .map(x => x.collectionName)
        expect(receivedNames).toEqual(
          expect.arrayContaining(expectedNames)
        )
        expect(receivedNames.length).toEqual(expectedNames.length)
      })
  )
})
