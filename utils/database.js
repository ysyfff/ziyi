import { MongoClient } from 'mongodb'

const srv="mongodb+srv://doudou:19890526aA_@cluster0.7cbbl.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(srv, {
  useNewUrlParser: true,
  useUnifieldTopology: true
})

async function connect() {
  if (!client.isConnected()) await client.connect();
  const db = client.db('doudou')
  return {db, client}
}

export { connect }