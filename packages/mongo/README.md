# Mongo

Minimal MongoDB client.

## Example usage

### Prerequisites

- npm or yarn

```bash
yarn add @xorb/mongo
 # or you can use
npm install @xorb/mongo --save
```

## Usage

```javascript
// index.js
import { mongo } from "@xorb/mongo";

const uri = "mongo://";

async function drop() {
  try {
    const db = await mongo.connect(uri);
    // connected to database, do something is needed
    const data = await db.collection("todos").find();
  } catch {
    // Something went wrong
  }
}

// controller.js
import { mongo } from "@xorb/mongo";

async function createTodo() {
  try {
    const db = await mongo.getDb();
    const res = db.collection("todos").insertOne(todo);
    // do more
  } catch {
    // handle errors
  }
}
```

## Contribute

I would really like a comments. So you can fork this repository and leave a PR with comments. Thanks.

## Author

Created and maintained by Dany Boza ([@xorbmoon](https://twitter.com/xorbmoon)).
