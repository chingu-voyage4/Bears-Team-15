import { app, server } from '../server/app'
import * as seed from '../server/seed/modules'
import errors from '../server/errMessages'

import chai from 'chai'
import chaiHttp from 'chai-http'
import { ObjectId } from 'mongodb'

chai.use(chaiHttp)

const quaker = {
  login: 'johndoe',
  password: 'password',
}

beforeAll(async () => {
  await seed.resetAllCollections()
  await seed.populateCollections()
  await chai.request(app).post('/register').send(quaker)
})

afterAll(server.close())

describe('POST `/register`', () => {
  const route = '/register'

  const newUser = {
    login: 'foobar',
    password: 'password',
  }

  it('should save a user', () =>
    chai.request(app)
      .post(route)
      .send(newUser)
      .then(response => {
        expect(response).toHaveProperty('status', 200)
        const received = response.body
        expect(received).toHaveProperty('_id')
        expect(received).toHaveProperty('login', newUser.login)
        expect(received).not.toHaveProperty('password')
      })
  )

  const doppelganger = {
    login: quaker.login,
    password: 'doesntmatter',
  }

  it('should not create duplicate `login`', done =>
    chai.request(app)
      .post(route)
      .send(doppelganger)
      .end((err, res) => {
        expect(res).toHaveProperty('status', 400)
        expect(res).toHaveProperty('text', errors.registration.duplicate)
        done()
      })
  )

  it('should not register user without login', done =>
    chai.request(app)
      .post(route)
      .send({ login: '', password: 'onlyPassword' })
      .end((err, res) => {
        expect(res).toHaveProperty('status', 400)
        expect(res).toHaveProperty('text', errors.registration.empty.login)
        done()
      })
  )

  it('should not register user without password', done =>
    chai.request(app)
      .post(route)
      .send({ login: 'anylogin', password: '' })
      .end((err, res) => {
        expect(res).toHaveProperty('status', 400)
        expect(res).toHaveProperty('text', errors.registration.empty.password)
        done()
      })
  )

  xit('should not register user with invalid login')

  xit('should not register user with invalid password')

  it('should register another user with same password', () =>
    chai.request(app)
      .post(route)
      .send({ login: 'goo', password: quaker.password})
      .then(res => {
        const received = res.body
        expect(received).toHaveProperty('_id')
        expect(received).toHaveProperty('login', 'goo')
      })
  )
})

describe('POST `/login`', () => {
  const route = '/login'

  it('should login by credentials', () =>
    chai.request(app)
      .post(route)
      .send(quaker)
      .then(response => {
        expect(response).toHaveProperty('status', 200)
        const received = response.body
        expect(received).toHaveProperty('_id')
        expect(received).toHaveProperty('login', quaker.login)
        expect(received).not.toHaveProperty('password')
      })
  )

  it('should respond 403 to empty request', done =>
    chai.request(app)
      .post(route)
      .send({})
      .end((err, res) => {
        expect(res).toHaveProperty('status', 403)
        expect(res).toHaveProperty('text', errors.login.common)
        done()
      })
  )

  it('should respond 403 to empty login', done =>
    chai.request(app)
      .post(route)
      .send({ password: 'anything' })
      .end((err, res) => {
        expect(res).toHaveProperty('status', 403)
        expect(res).toHaveProperty('text', errors.login.common)
        done()
      })
  )

  it('should respond 403 to empty password', done =>
    chai.request(app)
      .post(route)
      .send({ login: 'any' })
      .end((err, res) => {
        expect(res).toHaveProperty('status', 403)
        expect(res).toHaveProperty('text', errors.login.common)
        done()
      })
  )

  it('should not login if wrong `login`', done =>
    chai.request(app)
      .post(route)
      .send({ login: 'wronglogin', password: 'anypassword' })
      .end((err, res) => {
        expect(res).toHaveProperty('status', 403)
        expect(res).toHaveProperty('text', errors.login.wrongCredentials)
        done()
      })
  )

  it('should not login if wrong `password`', done =>
    chai.request(app)
      .post(route)
      .send({ login: quaker.login, password: 'wrongpassword' })
      .end((err, res) => {
        expect(res).toHaveProperty('status', 403)
        expect(res).toHaveProperty('text', errors.login.wrongCredentials)
        done()
      })
  )
})
