import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI, {
  family: 4,
});

let db;

export async function getDB() {
  if (!db) {
    await client.connect();
    db = client.db("asmual-portfolio");
  }
  return db;
}