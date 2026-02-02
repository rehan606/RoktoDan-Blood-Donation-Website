import { ObjectId } from "mongodb";
import client from "../mongoClient.js"; // তোমার MongoDB client

const verifyAdmin = async (req, res, next) => {
  const email = req.decoded?.email;

  if (!email) {
    return res.status(403).send({ message: "Forbidden access" });
  }

  const userCollection = client.db("yourDBname").collection("users");

  const user = await userCollection.findOne({ email });

  if (user?.role !== "admin") {
    return res.status(403).send({ message: "Admin access required" });
  }

  next();
};

export default verifyAdmin;
