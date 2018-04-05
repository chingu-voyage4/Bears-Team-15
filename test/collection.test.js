import { app, server } from '../server/app'
import * as seed from '../server/seed/modules'
import errors from '../server/errMessages'

import chai from 'chai'
import chaiHttp from 'chai-http'
import { ObjectId } from 'mongodb'

chai.use(chaiHttp)

const registeredUser = {
  login: 'johndoe',
  password: 'password',
}
const hacker = {
  login: 'hacker',
  password: 'password',
}

beforeAll(async () => {
  await seed.resetAllCollections()
  const res = await chai.request(app).post('/register').send(registeredUser)
  registeredUser._id = res.body._id.toString()
  registeredUser.authHeader = res.headers.authorization
  const hack = await chai.request(app).post('/register').send(hacker)
  hacker._id = hack.body._id.toString()
  hacker.authHeader = hack.headers.authorization
})

afterAll(server.close())

// CREATE
describe('POST `/collection/create`', () => {
  const path = '/collection/create'
  const newCollection = {
      collectionName: 'lorem ipsum',
      items: [{
        'q': 'lorem',
        'a': 'ipsum',
      }]
  }

  it('should respond with _id, add to user\'s array', () => chai.request(app)
    .post(path)
    .set('authorization', registeredUser.authHeader)
    .send(newCollection)
    .then(res => {
      expect(res.body).toHaveProperty('_id')
      expect(ObjectId.isValid(res.body._id)).toBeTruthy()
      const id = res.body._id
      chai.request(app).post(`/login`)
        .set('authorization', registeredUser.authHeader)
        .send()
        .end((err, res) => {
          const user = res.body
          expect(user).toHaveProperty('collections')
          expect(user.collections).toEqual(
            expect.arrayContaining([id])
          )
        })
    })
  )

  const badRequest = err => {
    const res = err.response
    expect(res).toHaveProperty('status', 400)
    expect(res).toHaveProperty('text', errors.collection.badRequest)
  }

  it('should respond 400 to invalid', () => chai.request(app)
    .post(path)
    .set('authorization', registeredUser.authHeader)
    .send({ gibberish: 'foobar', items: 'buzz' })
    .catch(badRequest)
  )

  it('should respond 400 to empty', () => chai.request(app)
    .post(path)
    .set('authorization', registeredUser.authHeader)
    .send({})
    .catch(badRequest)
  )

  it('should deny access if no authToken', () => chai.request(app)
    .post(path)
    .send(newCollection)
    .catch(err => {
      const res = err.response
      expect(res).toHaveProperty('status', 403)
      expect(res).toHaveProperty('text', errors.login.invalidToken)
    })
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
      .set('authorization', registeredUser.authHeader)
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

// FORK
describe('GET `/collection/fork/:id`', () => {
  let id = ''
  let path = ''
  const originalCard = { 'q': 'foo', 'a': 'bar' }
  const original = {
      collectionName: 'to clone',
      items: [originalCard]
  }

  beforeAll(() =>
    chai.request(app).post('/collection/create')
      .send(original)
      .set('authorization', registeredUser.authHeader)
      .then(res => {
        original._id = res.body._id
        path = `/collection/fork/${original._id}`
      })
  )

  it('should respond with new _id', () => chai.request(app)
    .get(path)
    .set('authorization', registeredUser.authHeader)
    .then(res => {
      const received = res.body
      expect(ObjectId.isValid(received._id)).toBeTruthy()
      expect(received._id).not.toEqual(original._id)
      return Promise.resolve(received._id)
    })
    .then(id => chai.request(app).get(`/collection/${id}`))
    .then(res => {
      const received = res.body
      expect(received).toHaveProperty('collectionName', original.collectionName)
      expect(received.items).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            q: originalCard.q,
            a: originalCard.a,
          })
        ])
      )
    })
  )

  it('should respond with 404 if wrong ID', () => chai.request(app)
    .get(`/collection/fork/${new ObjectId}`)
    .set('authorization', registeredUser.authHeader)
    .then(res => expect(res).toBeUndefined())
    .catch(err => {
      const res = err.response
      expect(res).toHaveProperty('status', 404)
      expect(res).toHaveProperty('text', errors.collection.notFound)
    })
  )

  it('should respond with 400 if invalid ID', () => chai.request(app)
    .get('/collection/fork/239b25a87687f87')
    .set('authorization', registeredUser.authHeader)
    .then(res => expect(res).toBeUndefined())
    .catch(err => {
      const res = err.response
      expect(res).toHaveProperty('status', 400)
      expect(res).toHaveProperty('text', errors.collection.badRequest)
    })
  )

  it('should deny access if no authToken', () => chai.request(app)
    .get(path)
    .then(res => expect(res).toBeUndefined())
    .catch(err => {
      const res = err.response
      expect(res).toHaveProperty('status', 403)
      expect(res).toHaveProperty('text', errors.login.invalidToken)
    })
  )
})

// UPDATE
describe('PUT `/collection/:id`', () => {
  let path = ''

  const deck = {
    collectionName: 'collection to update',
    items: [
      { q: 'dont touch', a: 'me' },
      { q: 'update', a: 'me' },
      { q: 'delete', a: 'me' },
      { q: 'update', a: 'me too' },
      { q: 'delete', a: 'me too' },
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
        { q: 'updated', a: 'updated1' },
        { q: 'updated', a: 'updated2' },
      ]
    }
  }

  const expected = {
    collectionName: 'collection with modified deck',
    items: [
      { q: 'dont touch', a: 'me' },
      { q: 'updated', a: 'updated1' },
      { q: 'updated', a: 'updated2' },
      { q: 'first added', a: 'card' },
      { q: 'second added', a: 'card' },
    ]
  }

  beforeAll(() => chai.request(app)
    .post('/collection/create')
    .set('authorization', registeredUser.authHeader)
    .send(deck)
    .then(res => path = `/collection/${res.body._id}`)
    .then(() => chai.request(app).get(path))
    .then(res => {
      saved = res.body
      const cardsToDelete = saved.items
        .filter(x => x.q === 'delete')
        .map(x => x._id.toString())
      changes.items.del = cardsToDelete
      const cardsToUpdate = saved.items
        .filter(x => x.q === 'update')
        .map(x => x._id.toString())
      changes.items.mod.forEach((x, i) => x._id = cardsToUpdate[i])
    })
  )

  it('should only update `name`, `shared`', () => chai.request(app)
    .put(path)
    .set('authorization', registeredUser.authHeader)
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

  it('should modify items', () => chai.request(app)
    .put(path)
    .set('authorization', registeredUser.authHeader)
    .send(changes)
    .then(res => {
      expect(res.body).toHaveProperty('collectionName', expected.collectionName)
      const receivedQA = res.body.items.map(({ q, a }) => ({ q, a }))
      expect(receivedQA).toEqual(
        expect.arrayContaining(expected.items)
      )
      const receivedID = res.body.items.map(({ _id }) => ({ _id }))
      expect(receivedID).not.toEqual(
        expect.arrayContaining([
          changes.items.del.map(x => ({ _id: x }))
        ])
      )
    })
  )

  it('should not update without authToken', () => chai.request(app)
    .put(path)
    .send(changes)
    .then(res => expect(res).toBeUndefined())
    .catch(err => {
      const res = err.response
      expect(res).toHaveProperty('status', 403)
      expect(res).toHaveProperty('text', errors.login.invalidToken)
    })
  )

  it('should not update other user\'s collection', () => chai.request(app)
    .put(path)
    .set('authorization', hacker.authHeader)
    .send(changes)
    .then(res => expect(res).toBeUndefined())
    .catch(err => {
      const res = err.response
      expect(res).toHaveProperty('status', 403)
      expect(res).toHaveProperty('text', errors.notAuthorized)
    })
  )

  it('should respond with 404 if wrong ID', () => chai.request(app)
    .put(`/collection/${new ObjectId}`)
    .set('authorization', registeredUser.authHeader)
    .then(res => expect(res).toBeUndefined())
    .catch(err => {
      const res = err.response
      expect(res).toHaveProperty('status', 404)
      expect(res).toHaveProperty('text', errors.collection.notFound)
    })
  )

  it('should respond with 400 if invalid ID', () => chai.request(app)
    .put('/collection/23920215a87687f87')
    .set('authorization', registeredUser.authHeader)
    .then(res => expect(res).toBeUndefined())
    .catch(err => {
      const res = err.response
      expect(res).toHaveProperty('status', 400)
      expect(res).toHaveProperty('text', errors.collection.badRequest)
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
    .set('authorization', registeredUser.authHeader)
    .send(deck)
    .then(res => {
      deck._id = res.body._id
      path = `/collection/${deck._id}`
    })
    .then(() => chai.request(app).get(path))
    .then(res => deck.items = res.body.items)
  )

  it('should not destroy without authToken', () => chai.request(app)
    .delete(path)
    .then(res => expect(res).toBeUndefined())
    .catch(err => {
      const res = err.response
      expect(res).toHaveProperty('status', 403)
      expect(res).toHaveProperty('text', errors.login.invalidToken)
    })
  )

  it('should not destroy other user\'s collection', () => chai.request(app)
    .delete(path)
    .set('authorization', hacker.authHeader)
    .then(res => expect(res).toBeUndefined())
    .catch(err => {
      const res = err.response
      expect(res).toHaveProperty('status', 403)
      expect(res).toHaveProperty('text', errors.notAuthorized)
    })
  )

  it('should destroy colleciton and cards', () => chai.request(app)
    .delete(path)
    .set('authorization', registeredUser.authHeader)
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
    .set('authorization', registeredUser.authHeader)
    .then(res => expect(res).toBeUndefined())
    .catch(err => {
      const res = err.response
      expect(res).toHaveProperty('status', 404)
      expect(res).toHaveProperty('text', errors.collection.notFound)
    })
  )

  it('should respond with 400 if invalid ID', () => chai.request(app)
    .delete('/collection/23920215a87687f87')
    .set('authorization', registeredUser.authHeader)
    .then(res => expect(res).toBeUndefined())
    .catch(err => {
      const res = err.response
      expect(res).toHaveProperty('status', 400)
      expect(res).toHaveProperty('text', errors.collection.badRequest)
    })
  )
})
