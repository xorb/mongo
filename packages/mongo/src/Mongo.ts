import { Db, MongoClient } from 'mongodb'
import retry from 'retry'
import Deferred from './Deferred'

export default class Mongo {
  public db: Promise<Db>
  public client: Promise<MongoClient>
  private uri?: string
  private deferredClient: Deferred<MongoClient>
  private deferredDb: Deferred<Db>

  constructor() {
    this.deferredClient = new Deferred<MongoClient>()
    this.client = this.deferredClient.promise
    this.deferredDb = new Deferred<Db>()
    this.db = this.deferredDb.promise
  }

  public async connect(
    uri: string,
    client?: MongoClient | Promise<MongoClient>
  ): Promise<Db> {
    this.uri = uri
    if (client !== undefined) {
      this.deferredClient.resolve(client)
    } else {
      this.deferredClient.resolve(this.createClient(this.uri))
    }
    this.deferredDb.resolve((await this.client).db())
    return this.db
  }

  public getDb(): Promise<Db> {
    return this.db
  }

  public async close(): Promise<void> {
    const client = await this.client
    client.close()
    return
  }
  private createClient(uri: string): Promise<MongoClient> {
    return new Promise<MongoClient>((resolve, reject) => {
      const operation = retry.operation()
      operation.attempt(async () => {
        try {
          const client = await MongoClient.connect(uri, {
            useNewUrlParser: true
          })
          resolve(client)
        } catch (e) {
          if (operation.retry(e)) {
            return
          }
          reject(e)
        }
      })
    })
  }
}
