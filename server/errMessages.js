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
    common (crud) {
      return `Failed to ${crud} a collection`
    },
    notFound: 'Collection not found',
    badRequest: 'Bad request. Check your collection object\'s structure',
  },
  card: {
    common (crud) {
      return `Failed to ${crud} a card`
    },
    notFound: 'Card not found',
    badRequest: 'Bad request. Check your card object\'s structure',
  },
  noPublicFound: 'No public collections found',
  worstScenario: 'Server error'
}
