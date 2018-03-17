const collections = require('./collections')
const { User, Collection, Card } = require('../models')

const resetAllCollections = async () => {
  try {
    await User.remove({})
    await Collection.remove({})
    await Card.remove({})
    return Promise.resolve()
  } catch (err) {
    console.error(err)
    return Promise.reject(err)
  }
}

const populateCollections = async () => {
  try {
    await Promise.all(
      collections.map(async x => await populateCollection(x))
    )
    return Promise.resolve()
  } catch (err) {
    console.error(err)
    return Promise.reject(err)
  }
}

const populateCollection = async ({ collectionName, shared, items }) => {
  try {
    const savedItems = await populateCards(items)
    const saved = await Collection({
      collectionName,
  	  shared,
      items: savedItems,
    }).save()
    return Promise.resolve(saved)
  } catch (err) {
    console.error(err)
    return Promise.reject(err)
  }
}

const populateCards = async deck => {
  try {
    const itemsId = await Promise.all(
      deck.map(async item => await Card.create(item))
    )
    return Promise.resolve(itemsId)
  } catch (err) {
    console.error(err)
    return Promise.reject(err)
  }
}

const seed = async () => {
  console.log('seed DB')
  try {
    await resetAllCollections()
    await populateCollections()
    console.log('Success: Seeding done')
    process.exit(0)
  } catch (err) {
    console.log('Error: Failed to seed')
    console.error(err)
    process.exit(1)
  }

}

module.exports = {
  collections,
  seed,
  resetAllCollections,
  populateCollections,
  populateCollection,
  populateCards,
}
