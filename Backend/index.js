const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const admin = require("firebase-admin");
const { ObjectId } = require("mongodb");


// Admin Middleware
// import verifyJWT from "./middlewares/verifyJWT.js";
// import verifyAdmin from "./middlewares/verifyAdmin.js";

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
      const token = authHeader.split(" ")[1];
      // if(!token) {
      //   return res.status(401).send({ message: 'unAuthorized access'})
      // }

      // Verify The Token 
      try {
        const decoded = await admin.auth().verifyIdToken(token);
        req.user = decoded;
        next();
      } catch (error) {
        return res.status(401).send({ message: 'Invalid Token'});
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

    app.get("/donors/pending", verifyToken, async (req, res) => {
      try {
        const pendingDonors = await donorsCollection
          .find({ status: "pending" })
          .sort({ createdAt: -1 })
          .toArray();

        res.send(pendingDonors);
      } catch (error) {
        res.status(500).send({ message: "Failed to fetch pending donors" });
      }
    });

    // Approve donor
  
    app.patch("/donors/approve/:id", verifyToken, async (req, res) => {
      const donorId = req.params.id;

      // 1️⃣ donor খুঁজে বের করি
      const donor = await donorsCollection.findOne({
        _id: new ObjectId(donorId),
      });

      if (!donor) {
        return res.status(404).send({ message: "Donor not found" });
      }

      // 2️⃣ donor status update
      const donorUpdate = await donorsCollection.updateOne(
        { _id: new ObjectId(donorId) },
        {
          $set: {
            status: "active",
            approvedAt: new Date(),
          },
        }
      );

      // 3️⃣ user role update
      const userUpdate = await userCollection.updateOne(
        { email: donor.email },
        {
          $set: {
            role: "donor",
            updatedAt: new Date(),
          },
        }
      );

      res.send({
        message: "Donor approved & user role updated",
        donorUpdate,
        userUpdate,
      });
    });


    // Reject donor
    app.patch("/donors/reject/:id", async (req, res) => {
      const id = req.params.id;

      try {
        const result = await donorsCollection.updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              status: "rejected",
              rejectedAt: new Date(),
            },
          }
        );

        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Reject failed" });
      }
    });

    // Get active donors
    app.get("/donors/active", async (req, res) => {
      try {
        const activeDonors = await donorsCollection
          .find({ status: "active" })
          .sort({ approvedAt: -1 })
          .toArray();

        res.send(activeDonors);
      } catch (error) {
        res.status(500).send({ message: "Failed to fetch active donors" });
      }
    });

    // Deactivate donor
    app.patch("/donors/deactivate/:id", async (req, res) => {
      const id = req.params.id;

      try {
        const result = await donorsCollection.updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              status: "deactivated",
              deactivatedAt: new Date(),
            },
          }
        );

        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Deactivation failed" });
      }
    });



    // ---------------------- MAKE ADMIN -----------------------

    // Search Users by Email
    app.get('/users/search', async (req, res) => {
      const { query } = req.query;

      if (!query) {
        return res.send([]);
      }

      const users = await userCollection
        .find({
          email: {
            $regex: `^${query}`, // email starts with query
            $options: "i",       // case-insensitive
          },
        })
        .project({
          email: 1,
          role: 1,
          created_at: 1,
          last_log_in: 1,
        })
        .limit(10)
        .toArray();

      res.send(users);
    });


    // Update User Role
    app.patch('/users/role/:id', async (req, res) => {
      const { role } = req.body;
      const id = req.params.id;

      if (!["admin", "user"].includes(role)) {
        return res.status(400).send({ message: "Invalid role" });
      }

      const result = await userCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { role } }
      );

      res.send(result);
    });  


    // Get user by role
    app.get('/users/role/:email', async (req, res) =>{
      try {
        const email = req.params.email;

        if (!email) {
          return res.status(400).send({ message: 'Email is required'});
        }

        const user = await userCollection.findOne({ email });

        if (!user) {
          return res.status(404).send({ message: 'User not found'});
        }

        res.send({ role: user.role || 'user' });
      } catch (error){
        console.error('Error getting user role:', error);
        return res.status(500).send({ message: 'Faild to get role'});
      }
    })








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
