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
    const bloodCollection = db.collection('request-blood');
    const bloodDonations = db.collection('bloodDonations');


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


    // ===============================
    // Get All Users For UserManagement
    // ===============================
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const role = req.query.role;
      const search = req.query.search;

      const query = {};

      if (role && role !== "all") {
        query.role = role;
      }

      if (search) {
        query.email = { $regex: search, $options: "i" };
      }

      const total = await userCollection.countDocuments(query);

      const users = await userCollection
        .find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ created_at: -1 })
        .toArray();

      res.send({
        users,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      });
    });

    // ===============================
    // UserManagement Role Update
    // ===============================
    app.patch("/users/role/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const { role } = req.body;

      const result = await userCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { role } }
      );

      res.send(result);
    });

    // ===============================
    // UserManagement Suspend / Ban User
    // ===============================
    app.patch("/users/status/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const { status } = req.body; // active | suspended | banned

      const result = await userCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status } }
      );

      res.send(result);
    });

    // ===============================
    // UserManagement Delete (Admin Protection)
    // ===============================
    app.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;

      // prevent deleting self
      const user = await userCollection.findOne({
        _id: new ObjectId(id),
      });

      if (user.email === req.decoded.email) {
        return res.status(403).send({
          message: "You cannot delete yourself",
        });
      }

      const result = await usersCollection.deleteOne({
        _id: new ObjectId(id),
      });

      res.send(result);
    });






    // ========= Set Donors Application in Database =========


    // ---------------- 90 DAYS HELPER ----------------
    const isEligibleAfter90Days = (lastDonationDate) => {
      if (!lastDonationDate) return 0;

      const today = new Date();
      const lastDate = new Date(lastDonationDate);

      today.setHours(0, 0, 0, 0);
      lastDate.setHours(0, 0, 0, 0);

      const diffTime = today.getTime() - lastDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      const remaining = 90 - diffDays;

      return remaining > 0 ? Math.ceil(remaining) : 0;
    };


    // const isEligibleAfter90Days = (lastDonationDate) => {
    //   const today = new Date();
    //   const lastDate = new Date(lastDonationDate);

    //   const diffTime = today - lastDate;
    //   const diffDays = diffTime / (1000 * 60 * 60 * 24);

    //   return diffDays >= 90;
    // };

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

        const donor = await donorsCollection.findOne({
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

    // Post Blood Request in Database
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
          status: "approved", // optional but useful
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

    // Search Blood From HOme Page
    

    // --------------------- Manage User and Donor Profile -------------------------

    // 🔹 GET user profile
    app.get("/profile/:email", async (req, res) => {
      try {
        const { email } = req.params;

        const user = await userCollection.findOne({ email });

        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }

        let donor = null;

        if (user.role === "donor") {
          donor = await donorsCollection.findOne({ email });
        }

        res.send({
          user,       // user full info
          donor,     // donor info or null
        });

      } catch (error) {
        console.error("GET /profile error:", error);
        res.status(500).send({ message: "Server error" });
      }
    });

    // 🔹 PUT update profile
    app.put("/profile/:email", async (req, res) => {
      try {
        const { email } = req.params;
        const { user: userData, donor: donorData } = req.body;

        const user = await userCollection.findOne({ email });

        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }

        // update user collection
        if (userData) {
          await userCollection.updateOne(
            { email },
            { $set: userData }
          );
        }

        // update donor collection if role donor
        if (user.role === "donor" && donorData) {
          await donorsCollection.updateOne(
            { email },
            { $set: donorData }
          );
        }

        res.send({ success: true });

      } catch (error) {
        console.error("PUT /profile error:", error);
        res.status(500).send({ message: "Server error" });
      }
    });

    // Display User Blood Request in user dashboard
    app.get("/blood-requests/my", async (req, res) => {
      const email = req.query.email;

      if (!email) {
        return res.status(400).send({ message: "Email required" });
      }

      const result = await bloodCollection
        .find({ email })
        .sort({ createdAt: -1 })
        .toArray();

      res.send(result);
    });

    // ---------------------- Donations by Donors ----------------------------------
    
    // ===============================
    // Add Donation (Donor)
    // ===============================
    app.post("/blood-donations", verifyToken, async (req, res) => {
      try {
        const donationData = req.body;
        const donorEmail = req.decoded.email;

        // ==============================
        // 1️⃣ Basic Validation
        // ==============================
        if (!donationData.patientName || !donationData.hospitalName) {
          return res.status(400).send({ message: "Required fields missing" });
        }

        // ==============================
        // 2️⃣ Donation Date Setup
        // ==============================
        const donatedAt = donationData.donatedAt
          ? new Date(donationData.donatedAt)
          : new Date();

        // Future date allow না
        const today = new Date();
        if (donatedAt > today) {
          return res.status(400).send({
            message: "Future donation date is not allowed",
          });
        }

        // ==============================
        // 3️⃣ Last Approved Donation খুঁজে বের করা
        // ==============================
        const lastDonation = await bloodDonations
          .find({
            donorEmail: donorEmail,
            status: "approved",
          })
          .sort({ donatedAt: -1 })
          .limit(1)
          .toArray();

        if (lastDonation.length > 0) {
          const lastDate = lastDonation[0].donatedAt;

          // তোমার দেওয়া function use করছি
          const remainingDays = isEligibleAfter90Days(lastDate);

          // যদি এখনো 90 দিন পূর্ণ না হয়
          if (remainingDays > 0) {
            return res.status(400).send({
              message: `You can donate after ${remainingDays} days.`,
            });
          }
        }

        // ==============================
        // 4️⃣ Final Donation Object
        // ==============================
        const newDonation = {
          donorEmail: donorEmail,
          donorId: donationData.donorId,
          bloodGroup: donationData.bloodGroup,
          patientName: donationData.patientName,
          hospitalName: donationData.hospitalName,
          donationType: donationData.donationType || "direct",
          requestId: donationData.requestId || null,
          donatedAt: donatedAt,
          status: "pending", // Admin approve না করা পর্যন্ত
          createdAt: new Date(),
        };

        // ==============================
        // 5️⃣ Insert Into Database
        // ==============================
        const result = await bloodDonations.insertOne(newDonation);

        res.send({
          success: true,
          message: "Donation submitted for approval",
          insertedId: result.insertedId,
        });

      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    // ===============================
    // Get Pending Donations (Admin)
    // ===============================
    app.get(
      "/blood-donations/pending",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        try {
          const pendingDonations = await bloodDonations
            .find({ status: "pending" }) // শুধু pending গুলো আনবে
            .sort({ createdAt: -1 }) // newest আগে
            .toArray();

          res.send(pendingDonations);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "Internal Server Error" });
        }
      }
    );



    // ===============================
    // Approve Donation (Admin)
    // ===============================
    app.patch(
      "/blood-donations/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        try {
          const id = req.params.id;

          const filter = { _id: new ObjectId(id) };

          const updateDoc = {
            $set: {
              status: "approved", // status approved
              approvedAt: new Date(), // approval time
            },
          };

          const result = await bloodDonations.updateOne(filter, updateDoc);

          res.send({
            success: true,
            message: "Donation approved successfully",
          });

        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "Internal Server Error" });
        }
      }
    );

    // ===============================
    // Delete Donation (Admin)
    // ===============================
    app.delete("/admin/delete-donation/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;

      const result = await bloodDonations.deleteOne({
        _id: new ObjectId(id),
      });

      res.send(result);
    });

    // ===============================
    // Display Approved Donation (Admin)
    // ===============================
    app.get(
      "/blood-donations/approved",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        try {
          const approvedDonations = await bloodDonations
            .find({ status: "approved" })
            .sort({ approvedAt: -1 }) // approval date অনুযায়ী
            .toArray();

          res.send(approvedDonations);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "Internal Server Error" });
        }
      }
    );


    // ===============================
    // Get My Donations (Donor Profile) 
    // ===============================
    app.get("/my-donations", verifyToken, async (req, res) => {
      try {
        const email = req.decoded.email;

        const myDonations = await bloodDonations
          .find({ donorEmail: email }) // শুধু নিজের গুলো
          .sort({ donatedAt: -1 }) // latest আগে
          .toArray();

        res.send(myDonations);

      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    // ===============================
    // Donor Dashboard Statistics
    // ===============================
    app.get("/donor/dashboard", verifyToken, async (req, res) => {
      try {
        const donorEmail = req.decoded.email;

        const donations = await bloodDonations
          .find({ donorEmail })
          .sort({ donatedAt: -1 })
          .toArray();

        const total = donations.length;
        const approved = donations.filter(d => d.status === "approved").length;
        const pending = donations.filter(d => d.status === "pending").length;

        const lastApproved = donations.find(d => d.status === "approved");

        res.send({
          total,
          approved,
          pending,
          lastApprovedDonation: lastApproved || null
        });

      } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
      }
    });


    // ===============================
    // Get Approved Donation Count
    // ===============================
    app.get("/blood-donations/count", verifyToken, async (req, res) => {
      try {
        const email = req.decoded.email;

        const total = await bloodDonations.countDocuments({
          donorEmail: email,
          status: "approved", // শুধু approved গুলো count হবে
        });

        res.send({ totalDonations: total });

      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });
     

    // ==============================
    // Dashboard Stats
    // ==============================
  app.get("/api/admin/dashboard-stats", async (req, res) => {
  try {

    const now = new Date();
    const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // ===============================
    // 1️⃣ Overview Counts (Parallel)
    // ===============================
    const [
      totalUsers,
      totalDonors,
      approvedDonors,
      pendingDonors,
      totalRequests,
      pendingRequests,
      totalDonations,
      availableDonors
    ] = await Promise.all([
      userCollection.countDocuments(),
      donorsCollection.countDocuments(),
      donorsCollection.countDocuments({ status: "approved" }),
      donorsCollection.countDocuments({ status: "pending" }),
      bloodCollection.countDocuments(),
      bloodCollection.countDocuments({ status: "pending" }),
      bloodDonations.countDocuments({ status: "approved" }),
      donorsCollection.countDocuments({ isAvailable: true })
    ]);

    // ===============================
    // 2️⃣ Donation Growth (Month Comparison)
    // ===============================
    const thisMonthDonations = await bloodDonations.countDocuments({
      status: "approved",
      donatedAt: { $gte: firstDayThisMonth }
    });

    const lastMonthDonations = await bloodDonations.countDocuments({
      status: "approved",
      donatedAt: {
        $gte: firstDayLastMonth,
        $lt: firstDayThisMonth
      }
    });

    const donationGrowth =
      lastMonthDonations === 0
        ? 100
        : ((thisMonthDonations - lastMonthDonations) /
            lastMonthDonations) *
          100;

    // ===============================
    // 3️⃣ Blood Group Distribution
    // ===============================
    const bloodGroupStats = await donorsCollection.aggregate([
      {
        $match: {
          role: "donor",
          status: "active"
        }
      },
      {
        $group: {
          _id: "$bloodGroup",
          total: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } }
    ]).toArray();


    // ===============================
    // 4️⃣ Union Wise Donors
    // ===============================
    const unionDonorStats = await donorsCollection.aggregate([
      {
        $match: {
          role: "donor",
          status: "active"
        }
      },
      {
        $group: {
          _id: "$union",
          totalDonors: { $sum: 1 }
        }
      },
      { $sort: { totalDonors: -1 } }
    ]).toArray();


    // ===============================
    // 5️⃣ Request Status
    // ===============================
    const requestStatusStats = await bloodCollection.aggregate([
      {
        $group: {
          _id: "$status",
          total: { $sum: 1 }
        }
      }
    ]).toArray();

    // ===============================
    // 6️⃣ Monthly Donations (Last 12 Months)
    // ===============================
    const monthlyDonations = await bloodDonations.aggregate([
      { $match: { status: "approved" } },
      {
        $group: {
          _id: {
            year: { $year: "$donatedAt" },
            month: { $month: "$donatedAt" }
          },
          total: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]).toArray();

    // ===============================
    // 7️⃣ Recent Data
    // ===============================
    const recentRequests = await bloodCollection
      .find()
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    const recentDonations = await bloodDonations
      .find({ status: "approved" })
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    // ===============================
    // 8️⃣ Top Donors
    // ===============================
    const topDonors = await bloodDonations.aggregate([
      { $match: { status: "approved" } },
      {
        $group: {
          _id: "$donorEmail",
          totalDonations: { $sum: 1 }
        }
      },
      { $sort: { totalDonations: -1 } },
      { $limit: 5 }
    ]).toArray();

    // ===============================
    // Final Response
    // ===============================
    res.json({
      overview: {
        totalUsers,
        totalDonors,
        approvedDonors,
        pendingDonors,
        totalRequests,
        pendingRequests,
        totalDonations,
        availableDonors
      },
      growth: {
        donationGrowth: donationGrowth.toFixed(2)
      },
      bloodGroupStats,
      unionDonorStats,
      requestStatusStats,
      monthlyDonations,
      recentRequests,
      recentDonations,
      topDonors
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Dashboard stats failed" });
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
