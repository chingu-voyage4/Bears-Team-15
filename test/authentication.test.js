import { app, server } from '../server/app'
import * as seed from '../server/seed/modules'
import errors from '../server/errMessages'

import chai from 'chai'
import chaiHttp from 'chai-http'
import { ObjectId } from 'mongodb'

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET

chai.use(chaiHttp)

const quaker = {
  login: 'johndoe',
  password: 'password',
}

beforeAll(async () => {
  await seed.resetAllCollections()
  const res = await chai.request(app).post('/register').send(quaker)
  quaker._id = res.body._id.toString()
  quaker.authToken = jwt.sign({
      _id: quaker._id
    }, JWT_SECRET, { expiresIn: '5d' })
})

afterAll(server.close())

describe('POST `/register`', () => {
  const route = '/register'

  const newUser = {
    login: '-@-_.235921fkhSH.',
    password: '72chars max lenght but 72bytes UTF8 лорем іпсум долорем',
  }

  it('should register weirdest possible login', () => chai.request(app)
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

  it('should not create duplicate `login`', () =>
    chai.request(app)
      .post(route)
      .send(doppelganger)
      .catch(err => {
        const res = err.response
        expect(res).toHaveProperty('status', 400)
        expect(res).toHaveProperty('text', errors.registration.duplicate)
      })
  )

  it('should not register user without login', () =>
    chai.request(app)
      .post(route)
      .send({ login: '', password: 'onlyPassword' })
      .catch(err => {
        const res = err.response
        expect(res).toHaveProperty('status', 400)
        expect(res).toHaveProperty('text', errors.registration.emptyLogin)
      })
  )

  it('should not register user without password', () =>
    chai.request(app)
      .post(route)
      .send({ login: 'anylogin', password: '' })
      .catch(err => {
        const res = err.response
        expect(res).toHaveProperty('status', 400)
        expect(res).toHaveProperty('text', errors.registration.emptyPwd)
      })
  )

  it('should not register user with invalid login', () => chai.request(app)
    .post(route)
    .send({ login: '35&89021sd*afjkhSR', password: 'password' })
    .catch(err => {
        const res = err.response
        expect(res).toHaveProperty('status', 400)
        expect(res).toHaveProperty('text', errors.registration.invalidLogin)
    })
  )

  it('should not register too short password', () => chai.request(app)
    .post(route)
    .send({ login: 'anylogin', password: '1234'})
    .catch(err => {
      const res = err.response
      expect(res).toHaveProperty('status', 400)
      expect(res).toHaveProperty('text', errors.registration.invalidPwd)
    })
  )

  it('should not register too long password', () => chai.request(app)
    .post(route)
    .send({ login: 'foobario', password: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore ex beatae a deleniti ducimus vitae accusamus repellendus cupiditate sequi itaque consectetur eum saepe, dignissimos vel atque, iste ullam, quod doloribus.`})
    .catch(err => {
      const res = err.response
      expect(res).toHaveProperty('status', 400)
      expect(res).toHaveProperty('text', errors.registration.invalidPwd)
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

        expect(response.headers).toHaveProperty('authorization')
        const token = response.headers.authorization.split(' ')[1]
        expect(token).toBeDefined()

        const received = response.body
        expect(received).toHaveProperty('_id')
        expect(received).toHaveProperty('login', quaker.login)
        expect(received).not.toHaveProperty('password')

        const decoded = jwt.verify(token, JWT_SECRET)
        expect(received._id).toEqual(decoded._id)
      })
  )

  it('should respond 403 to empty request', () =>
    chai.request(app)
      .post(route)
      .send({})
      .catch(err => {
        const res = err.response
        expect(res).toHaveProperty('status', 403)
        expect(res).toHaveProperty('text', errors.login.common)
      })
  )

  it('should respond 403 to empty login', () =>
    chai.request(app)
      .post(route)
      .send({ password: 'anything' })
      .catch(err => {
        const res = err.response
        expect(res).toHaveProperty('status', 403)
        expect(res).toHaveProperty('text', errors.login.common)
      })
  )

  it('should respond 403 to empty password', () =>
    chai.request(app)
      .post(route)
      .send({ login: 'any' })
      .catch(err => {
        const res = err.response
        expect(res).toHaveProperty('status', 403)
        expect(res).toHaveProperty('text', errors.login.common)
      })
  )

  it('should not login if wrong `login`', () =>
    chai.request(app)
      .post(route)
      .send({ login: 'wronglogin', password: 'anypassword' })
      .catch(err => {
        const res = err.response
        expect(res).toHaveProperty('status', 403)
        expect(res).toHaveProperty('text', errors.login.wrongCredentials)
      })
  )

  it('should not login if wrong `password`', () =>
    chai.request(app)
      .post(route)
      .send({ login: quaker.login, password: 'wrongpassword' })
      .catch(err => {
        const res = err.response
        expect(res).toHaveProperty('status', 403)
        expect(res).toHaveProperty('text', errors.login.wrongCredentials)
      })
  )
})
