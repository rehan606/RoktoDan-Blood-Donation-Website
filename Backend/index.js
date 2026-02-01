const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const admin = require("firebase-admin");

// DB connect


// ========= Middleware =========
app.use(cors());
app.use(express.json());

// ========= Firebase Admin Configure File =========


admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});


// const serviceAccount = require("./firebase-admin-key.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });




  // ========= MongoDB Driver =========

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jwii9.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = client.db('roktoDan');
    const userCollection = db.collection('users');
    const donorsCollection = db.collection('donors');


    // ========= Custom Middleware =========
    const verifyToken = async (req, res, next) => {

      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).send({ message: 'unAuthorized access'})
      }
      const token = authHeader.split(' ')[1];
      if(!token) {
        return res.status(401).send({ message: 'unAuthorized access'})
      }

      // Verify The Token 
      try {
        const decoded = await admin.auth.verifyIdToken(token);
        req.decoded = decoded;
        next();
      } catch (error) {
        return res.status(403).send({ message: 'forbidden access'})
      }
    }

    // ========= Set User in Database =========
    // app.post('/users', async(req, res) => {
    //   const email = req.body.email;
    //   const userExists = await userCollection.findOne({ email })
    //   if (userExists){
    //     return res.status(200).send({ message: 'User Already Exists', inserted: false });
    //   }
    //   const user = req.body;
    //   const result = await userCollection.insertOne(user);
    //   res.send(result);
    // })

    // ========= Set User in Database =========

    app.post('/users', verifyToken, async (req, res) => {
      try {
        const user = req.body;

        if (!user?.email) {
          return res.status(400).send({ message: "Email is required" });
        }

        const existingUser = await userCollection.findOne({ email: user.email });

        if (existingUser) {
          return res.send({ message: 'User Already Exists', inserted: false });
        }

        const result = await userCollection.insertOne(user);
        res.send({ inserted: true, result });

      } catch (error) {
        console.error("❌ User insert error:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    // ========= Set Donors Application in Database =========


    // ---------------- 90 DAYS HELPER ----------------
    const isEligibleAfter90Days = (lastDonationDate) => {
      const today = new Date();
      const lastDate = new Date(lastDonationDate);

      const diffTime = today - lastDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      return diffDays >= 90;
    };

    // ---------------- /donors POST API ----------------
    app.post("/donors", async (req, res) => {
      try {
        const donorData = req.body;

        let isAvailable = true;

        // old donor হলে 90 days check
        if (donorData.donorType === "old" && donorData.lastDonationDate) {
          isAvailable = isEligibleAfter90Days(donorData.lastDonationDate);
        }

        const donorPayload = {
          ...donorData,
          role: "donor",
          isAvailable,
          createdAt: new Date(),
        };

        // new donor হলে lastDonationDate remove
        if (donorData.donorType === "new") {
          delete donorPayload.lastDonationDate;
        }

        const result = await donorsCollection.insertOne(donorPayload);

        res.status(201).json({
          success: true,
          message: "Donor added successfully",
          donorId: result.insertedId,
          donor: donorPayload,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    });


    // ---------------- GET PENDING DONORS ----------------
    app.get("/donors/pending", async (req, res) => {
      try {
        const pendingDonors = await donorsCollection
          .find({ status: "pending" })
          .sort({ createdAt: -1 }) // newest first
          .toArray();

        res.json({
          success: true,
          count: pendingDonors.length,
          donors: pendingDonors,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    });





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Server is running');
});





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
