const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
  {
    // Basic Identity
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^(?:\+8801|01)[3-9]\d{8}$/, "Invalid Bangladeshi phone number"],
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    avater: {
        type: String,
    },

    // Blood Info
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },

    // Personal Details
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    dateOfBirth: {
      type: Date,
    },

    weight: {
      type: Number,
      min: 45,
    },

    // Address (Bangladesh Structure)
    division: {
      type: String,
      required: true,
      trim: true,
    },

    district: {
      type: String,
      required: true,
      trim: true,
    },

    upazila: {
      type: String,
      required: true,
      trim: true,
    },

    
    union: {
    type: String,
    required: true,
    enum: [
        "Amanullah",
        "Bauria",
        "Gachhua",
        "Harishpur",
        "Kalapania",
        "Magdhara",
        "Maitbhanga",
        "Musapur",
        "Santoshpur",
        "Dirgapar",
        "Rohomotpur",
        "Sarikait"
        ],
    },


    address: {
      type: String,
    },

    // Donation Status
    lastDonationDate: {
      type: Date,
    },

    available: {
      type: Boolean,
      default: true,
    },

    donationCount: {
      type: Number,
      default: 0,
    },

    // Health & Safety
    isHealthy: {
      type: Boolean,
      default: true,
    },

    notes: {
      type: String,
    },

    // System Role
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// 🔍 Optimized search index
donorSchema.index({
  bloodGroup: 1,
  district: 1,
  upazila: 1,
  union: 1,
});


const donorModel=mongoose.models.donor || mongoose.model('donor',donorSchema);

export default donorModel;

// module.exports = mongoose.model("Donor", donorSchema);
