import { mongo } from '@xorb/mongo'

async function createClient() {
  const uri = 'mongodb://'
  try {
    await mongo.connect(uri)
    return 'Connected'
  } catch (err) {
    throw err
  }
}

createClient()
  .then(res => console.log(res))
  .catch(e => console.log('e'))
