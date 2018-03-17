export default {
  registration: {
    common: 'Failed to register user',
    duplicate: 'User is already registered',
    empty: {
      login: 'Failed to register. Login must be provided',
      password: 'Failed to register. Password must be provided',
    }
  },
  login: {
    common: 'Login error. Access denied',
    wrongCredentials: 'Wrong credentials. Access denied',
  },
  collection: {
    create: {
      common: 'Failed to create a new collection',
    },
    read: {
      common: 'Failed to read a collection',
    },
    update: {
      common: 'Failed to update a collection',
    },
    destroy: {
      common: 'Failed to destory a collection',
    },
    notFound: 'Collection not found',
    badRequest: 'Bad request. Check your object\'s structure',
  },
  noPublicFound: 'No public collections found',
  worstScenario: 'Server error'
}
