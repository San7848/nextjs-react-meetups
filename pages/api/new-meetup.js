import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;

      const client = await MongoClient.connect(
        process.env.MONGODB_URI
      );

      const db = client.db();
      const meetupCollection = db.collection("meetup");

      await meetupCollection.insertOne(data);

      client.close();

      return res.status(201).json({ message: "Meetup inserted!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Database error" });
    }
  }

  res.status(405).json({ message: "Method not allowed" });
}

export default handler;
