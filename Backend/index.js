const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const admin = require("firebase-admin");
const { ObjectId } = require("mongodb");
// import { ObjectId } from "mongodb";


// Admin Middleware


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
    const bloodCollection = db.collection('request-blood')


    // ========= Custom Middleware =========

    // ---------Verify Firebase Token -------------
    const verifyToken = async (req, res, next) => {

      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).send({ message: 'unAuthorized access'})
      }
      const token = authHeader.split(" ")[1];
      if(!token) {
        return res.status(401).send({ message: 'unAuthorized access'})
      }

      // Verify The Token 
      try {
        const decoded = await admin.auth().verifyIdToken(token);
        req.decoded = decoded;
        next();
      } catch (error) {
        return res.status(401).send({ message: 'Forbidden access'});
      }
    }

    // ---------- Varify Admin ---------------
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded?.email;
      const query = { email }
      const user = await userCollection.findOne( query );


      if (!user || user?.role !== 'admin') {
        return res.status(403).send({ message: "Forbidden access" });
      }

      next();
    };

    // ----------------------------------------------------------------------

    // ========= Set User in Database =========

    // app.post('/users', verifyToken, async (req, res) => {
    //   try {
    //     const user = req.body;

    //     if (!user?.email) {
    //       return res.status(400).send({ message: "Email is required" });
    //     }

    //     const existingUser = await userCollection.findOne({ email: user.email });

    //     if (existingUser) {
    //       return res.send({ message: 'User Already Exists', inserted: false });
    //     }

    //     const result = await userCollection.insertOne(user);
    //     res.send({ inserted: true, result });

    //   } catch (error) {
    //     console.error("❌ User insert error:", error);
    //     res.status(500).send({ message: "Internal Server Error" });
    //   }
    // });


    app.post("/users", verifyToken, async (req, res) => {
      try {
        const user = req.body;

        if (!user?.email) {
          return res.status(400).send({ message: "Email is required" });
        }

        const existingUser = await userCollection.findOne({ email: user.email });

        if (existingUser) {
          return res.send({ message: "User Already Exists", inserted: false });
        }

        const newUser = {
          name: user.name || "",
          email: user.email,
          role: user.role || "user",
          image: user.image || "",   // ✅ IMPORTANT
          created_at: new Date(),
          last_log_in: new Date(),
        };

        const result = await userCollection.insertOne(newUser);
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

    app.get("/donors/pending", verifyToken,  async (req, res) => {
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
  
    app.patch("/donors/approve/:id", verifyToken, verifyAdmin, async (req, res) => {
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
    app.patch("/donors/reject/:id", verifyToken, verifyAdmin, async (req, res) => {
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
    app.get("/donors/active", verifyToken, verifyAdmin, async (req, res) => {
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
    app.patch("/donors/deactivate/:id", verifyToken, verifyAdmin, async (req, res) => {
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
    app.get('/users/search', verifyToken, verifyAdmin, async (req, res) => {
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
    app.patch('/users/role/:id', verifyToken, verifyAdmin, async (req, res) => {
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
    app.get('/users/role/:email', verifyToken,  async (req, res) =>{
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

    // --------------------- BLOOD REQUEST POST -----------------------

    // Admin: Get blood requests with pagination
    app.get("/dashboard/blood-requests", async (req, res) => {
      try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const total = await bloodCollection.countDocuments();

        const requests = await bloodCollection
          .find()
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .toArray();

        res.send({
          success: true,
          total,
          totalPages: Math.ceil(total / limit),
          currentPage: page,
          data: requests,
        });
      } catch (error) {
        res.status(500).send({
          success: false,
          message: error.message,
        });
      }
    });


    // ----------------------- DELETE: Blood request (Admin only)-------------------------
    

    app.delete("/dashboard/blood-requests/:id", async (req, res) => {
      try {
        const id = req.params.id;

        const result = await bloodCollection.deleteOne({
          _id: new ObjectId(id),
        });

        res.send({
          success: result.deletedCount > 0,
        });
      } catch (error) {
        res.status(500).send({
          success: false,
          message: error.message,
        });
      }
    });

    // --------------------------------------------------------------------------------------------------


    // ------------------------- Display Donors in Frontend Donors page --------------------------

    // app.get('/donors', async (req, res) => {
    //   try {
    //     const { bloodGroup, union } = req.query;

    //     const query = {
    //       status: "active",
    //     };

    //     if (bloodGroup) {
    //       query.bloodGroup = bloodGroup;
    //     }

    //     if (union) {
    //       query.union = union;
    //     }

    //     let donors = await donorsCollection.find(query).toArray();

    //     const today = new Date();

    //     for (let donor of donors) {
    //       if (donor.lastDonationDate) {
    //         const lastDate = new Date(donor.lastDonationDate);
    //         const diffInMonths =
    //           (today.getFullYear() - lastDate.getFullYear()) * 12 +
    //           (today.getMonth() - lastDate.getMonth());

    //         const shouldBeAvailable = diffInMonths >= 3;

    //         // 🔁 Auto update database if needed
    //         if (donor.isAvailable !== shouldBeAvailable) {
    //           await donorsCollection.updateOne(
    //             { _id: donor._id },
    //             {
    //               $set: {
    //                 isAvailable: shouldBeAvailable,
    //               },
    //             }
    //           );
    //           donor.isAvailable = shouldBeAvailable;
    //         }
    //       }
    //     }

    //     res.send(donors);
    //   } catch (error) {
    //     console.error("❌ Donor fetch error:", error);
    //     res.status(500).send({ message: "Internal Server Error" });
    //   }
    // });

    app.get("/donors", async (req, res) => {
      try {
        const { bloodGroup, union, page = 1 } = req.query;

        const limit = 18;                  // ✅ per page 18 cards
        const skip = (parseInt(page) - 1) * limit;

        // 🔹 filter logic
        const matchStage = {
          status: "active",
        };

        if (bloodGroup) {
          matchStage.bloodGroup = bloodGroup;
        }

        if (union) {
          matchStage.union = union;
        }

        // 🔹 Total count ( for pagination )
        const totalCount = await donorsCollection.countDocuments(matchStage);
        const totalPages = Math.ceil(totalCount / limit);

        // 🔹 Main aggregate pipeline
        const donors = await donorsCollection.aggregate([
          // 1️⃣ Filter
          { $match: matchStage },

          // 2️⃣ Join users → image, name
          {
            $lookup: {
              from: "users",
              localField: "email",
              foreignField: "email",
              as: "userInfo",
            },
          },

          // 3️⃣ array → object
          { $unwind: "$userInfo" },

          // 4️⃣ Pagination
          { $skip: skip },
          { $limit: limit },

          // 5️⃣ Final shape (frontend safe)
          {
            $project: {
              name: 1,
              image: "$userInfo.image",
              email: 1,
              bloodGroup: 1,
              phone: 1,
              union: 1,
              lastDonationDate: 1,
              isAvailable: 1,
            },
          },
        ]).toArray();

        // 🔁 ⛔  availability logic 
        const today = new Date();

        for (let donor of donors) {
          if (donor.lastDonationDate) {
            const lastDate = new Date(donor.lastDonationDate);
            const diffInMonths =
              (today.getFullYear() - lastDate.getFullYear()) * 12 +
              (today.getMonth() - lastDate.getMonth());

            const shouldBeAvailable = diffInMonths >= 3;

            if (donor.isAvailable !== shouldBeAvailable) {
              await donorsCollection.updateOne(
                { email: donor.email },
                { $set: { isAvailable: shouldBeAvailable } }
              );

              donor.isAvailable = shouldBeAvailable; // frontend sync
            }
          }
        }

        // 🔹 Response
        res.send({
          data: donors,
          currentPage: parseInt(page),
          totalPages,
          totalCount,
        });
      } catch (error) {
        console.error("❌ Donor fetch error:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });


    // --------------------- Single Donor Details ------------------------
    app.get('/donors/:id', async (req, res) => {
      try {
        const { id } = req.params;

        const donor = await donorCollection.findOne({
          _id: new ObjectId(id),
        });

        if (!donor) {
          return res.status(404).send({ message: "Donor not found" });
        }

        res.send(donor);
      } catch (error) {
        console.error("❌ Single donor fetch error:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    // --------------------------------------------------------------------------------------------------
    
    // --------------------- Blood Requests ------------------------
    app.post('/blood-request', async (req, res) => {
      try {
        const {
          name,
          email,
          age,
          bloodGroup,
          union,
          phone,
          message,
          role,
        } = req.body;

        // 🔐 Basic validation
        if (!email || !role) {
          return res.status(400).json({
            success: false,
            message: "Email and role are required",
          });
        }

        const requestPayload = {
          name,
          email,        // 🔑 ownership
          age,
          bloodGroup,
          union,
          phone,
          message,

          role,         // "user" | "donor"
          status: "pending", // optional but useful
          createdAt: new Date(),
        };

        const result = await bloodCollection.insertOne(requestPayload);

        res.status(201).json({
          success: true,
          message: "Request sent successfully",
          insertedId: result.insertedId,
          request: requestPayload,
        });

      } catch (error) {
        console.error("❌ Blood request insert error:", error);
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    });

    // Display All Blood Request
    app.get("/blood-requests", async (req, res) => {
      try {
        const requests = await bloodCollection
          .find({})
          .sort({ createdAt: -1 })
          .toArray();

        res.send(requests);
      } catch (err) {
        res.status(500).send({ message: "Failed to load requests" });
      }
    });


    // Display blood Request in Home page
    app.get("/blood-requests/latest", async (req, res) => {
      try {
        const requests = await bloodCollection
          .find({})
          .sort({ createdAt: -1 }) // 🔥 latest first
          .limit(3)
          .toArray();

        res.send(requests);
      } catch (err) {
        res.status(500).send({ message: "Failed to load requests" });
      }
    });

    

    // --------------------- MongoDB Aggregate for Admin Dashboard -------------------------
     









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
