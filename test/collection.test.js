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

// CREATE
describe('POST `/collection/create`', () => {
  const path = '/collection/create'

  it('should respond with _id', () => chai.request(app)
    .post(path)
    .send({
      collectionName: 'lorem ipsum',
      items: [{
        'q': 'lorem',
        'a': 'ipsum',
      }]
    })
    .then(res => {
      expect(res.body).toHaveProperty('_id')
      expect(ObjectId.isValid(res.body._id)).toBeTruthy()
    })
  )

  const badRequest = err => {
    const res = err.response
    expect(res).toHaveProperty('status', 400)
    expect(res).toHaveProperty('text', errors.collection.badRequest)
  }

  it('should respond 400 to invalid', () => chai.request(app)
    .post(path)
    .send({ gibberish: 'foobar', items: 'buzz' })
    .catch(badRequest)
  )

  it('should respond 400 to empty', () => chai.request(app)
    .post(path)
    .send({})
    .catch(badRequest)
  )
})

// READ
describe('GET `/collection/:id`', () => {
  let id = ''
  let path = ''
  const expectedCard = { 'q': 'foo', 'a': 'bar' }
  const expected = {
      collectionName: 'foobar',
      items: [expectedCard]
  }

  beforeAll(() =>
    chai.request(app).post('/collection/create')
      .send(expected)
      .then(res => {
        expected._id = res.body._id
        path = `/collection/${expected._id}`
      })
  )

  it('should respond with proper collection', () =>
    chai.request(app)
      .get(path)
      .then(res => {
        const received = res.body
        expect(ObjectId.isValid(received._id)).toBeTruthy()
        expect(received._id).toEqual(expected._id)
        expect(received.collectionName).toEqual(expected.collectionName)
        expect(received.items).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              q: expectedCard.q,
              a: expectedCard.a,
            })
          ])
        )
      })
  )
})

// UPDATE
describe('PUT `/collection/:id`', () => {
  it('should update')
  // .findByIdAndUpdate()
})

// DESTROY
describe('DELETE `/collection/:id`', () => {
  it('should update')
  // .findByIdAndRemove()
})
