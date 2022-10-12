import { MongoClient } from 'mongodb'

let uri: string = process.env.connect_str
let dbName = process.env.MONGODB_DB

let cachedClient : MongoClient
let cachedDb

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  )
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }
  if(uri){
    const client = await MongoClient.connect(uri,{})
    
      const db = client.db(dbName)
    
      cachedClient = client
      cachedDb = db
    
      return { client, db }
  }

  throw new Error("invalid uri")
  
}