export default {
  registration: {
    common: 'Failed to register user',
    duplicate: 'User is already registered',
    invalidLogin: 'Login should only contain numbers, digits, hyphen, underscore, period and @',
    invalidPwd: 'Password should be 8 - 72 characters, 72 bytes max',
    emptyLogin: 'Failed to register. Login must be provided',
    emptyPwd: 'Failed to register. Password must be provided'
  },
  login: {
    common: 'Login error. Access denied',
    wrongCredentials: 'Wrong credentials. Access denied',
    invalidToken: 'Invalid authentication token',
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
