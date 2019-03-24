import { mongo } from '@xorb/mongo'

async function initDatabase() {
  try {
    const uri = 'mongo://'
    const db = await mongo.connect(uri)
    // connected to database, do something is needed
    const data = await db.collection('todos').find()
  } catch {
    // Something went wrong
  }
}

async function createTodo() {
  try {
    const db = await mongo.getDb()
    const todo = { body: 'Hello world', completed: false }
    const res = db.collection('todos').insertOne(todo)
    // do more
  } catch {
    // handle errors
  }
}
