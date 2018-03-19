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

  it('should respond with 404 if wrong ID', () => chai.request(app)
    .get(`/collection/${new ObjectId}`)
    .catch(err => {
      const res = err.response
      expect(res).toHaveProperty('status', 404)
      expect(res).toHaveProperty('text', errors.collection.notFound)
    })
  )

  it('should respond with 400 if invalid ID', () => chai.request(app)
    .get('/collection/239b25a87687f87')
    .catch(err => {
      const res = err.response
      expect(res).toHaveProperty('status', 400)
      expect(res).toHaveProperty('text', errors.collection.badRequest)
    })
  )
})

// UPDATE
describe('PUT `/collection/:id`', () => {
  let path = ''

  const deck = {
    collectionName: 'collection to update',
    items: [
      { 'q': 'dont touch', 'a': 'me' },
      { 'q': 'update', 'a': 'me' },
      { 'q': 'delete', 'a': 'me' },
    ]
  }

  let saved = {}

  const changes = {
    collectionName: 'collection with modified deck',
    items: {
      add: [
        { q: 'first added', a: 'card' },
        { q: 'second added', a: 'card' },
      ],
      del: [],
      mod: [
        { q: 'updated', a: 'updated' }
      ]
    }
  }

  const expected = {
    collectionName: 'collection with modified deck',
    items: [
      { q: 'dont touch', a: 'me' },
      { q: 'updated', a: 'updated' },
      { q: 'first added', a: 'card' },
      { q: 'second added', a: 'card' },
    ]
  }

  beforeAll(() => chai.request(app)
    .post('/collection/create')
    .send(deck)
    .then(res => path = `/collection/${res.body._id}`)
    .then(() => chai.request(app).get(path))
    .then(res => {
      saved = res.body
      const cardToDelete = saved.items.find(x => x.q === 'delete')._id
      changes.items.del.push(cardToDelete.toString())
      const cardToUpdate = saved.items.find(x => x.q === 'update')._id
      changes.items.mod[0]._id = cardToUpdate.toString()
    })
  )

  it('should only update `name`, `shared`', () => chai.request(app)
    .put(path)
    .send({ collectionName: 'Updated name', shared: true })
    .then(res => {
      expect(res.body).toHaveProperty('collectionName', 'Updated name')
      expect(res.body).toHaveProperty('shared', true)
      const expected = saved.items.map(x => ({
         _id: x._id,
         q: x.q,
         a: x.a,
      }))
      const received = res.body.items.map(({ _id, q, a }) => ({ _id, q, a}))
      expect(received).toEqual(
        expect.arrayContaining(expected)
      )
    })
  )
})

// DESTROY
describe('DELETE `/collection/:id`', () => {
  let path = ''
  const deck = {
    collectionName: 'collection to delete',
    items: [{ 'q': 'delete', 'a': 'me' }]
  }

  beforeAll(() => chai.request(app)
    .post('/collection/create')
    .send(deck)
    .then(res => {
      deck._id = res.body._id
      path = `/collection/${deck._id}`
    })
    .then(() => chai.request(app).get(path))
    .then(res => deck.items = res.body.items)
  )

  it('should destroy colleciton and cards', () => chai.request(app)
    .delete(path)
    .then(res => {
      expect(res.body._id).toEqual(deck._id)
    })
    .then(() => chai.request(app).get(path))
    .then(res => expect(res).toEqual(undefined))
    .catch(err => {
      const res = err.response
      expect(res).toHaveProperty('status', 404)
      expect(res).toHaveProperty('text', errors.collection.notFound)
      return Promise.resolve(deck.items[0]._id)
    })
    .then(id => chai.request(app).get(`/card/${id}`))
    .then(res => expect(res).toEqual(undefined))
    .catch(err => {
      const res = err.response
      expect(res).toHaveProperty('status', 404)
      expect(res).toHaveProperty('text', errors.card.notFound)
    })
  )

  it('should respond with 404 if wrong ID', () => chai.request(app)
    .delete(`/collection/${new ObjectId}`)
    .catch(err => {
      const res = err.response
      expect(res).toHaveProperty('status', 404)
      expect(res).toHaveProperty('text', errors.collection.notFound)
    })
  )

  it('should respond with 400 if invalid ID', () => chai.request(app)
    .delete('/collection/23920215a87687f87')
    .catch(err => {
      const res = err.response
      expect(res).toHaveProperty('status', 400)
      expect(res).toHaveProperty('text', errors.collection.badRequest)
    })
  )
})
