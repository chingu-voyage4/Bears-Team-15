const collections = require('./collections')
const { Collection, Card } = require('../models')

const resetAllCollections = async () => {
  try {
    await Collection.remove({})
    return Promise.resolve()
  } catch (err) {
    console.error(err)
    return Promise.reject(err)
  }
}

const populateCollections = async () => {
  try {
    for (let collection of collections) {
      await populateCollection(collection)
    }
    return Promise.resolve()
  } catch (err) {
    console.error(err)
    return Promise.reject(err)
  }
}

const populateCollection = async ({ collectionName, public, items }) => {
  try {
    const savedItems = await populateCards(items)
    const saved = await Collection({
      collectionName,
	  public,
      items: savedItems,
    }).save()
    return Promise.resolve(saved)
  } catch (err) {
    console.error(err)
    return Promise.reject(err)
  }
}

const populateCards = async deck => {
  const list = []
  try {
    for (let card of deck) {
      const saved = await Card(card).save()
      list.push(saved._id)
    }
    return Promise.resolve(list)
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
