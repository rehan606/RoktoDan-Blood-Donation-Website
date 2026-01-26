import validator from 'validator';
import donorModel from "../models/donorModels.js";

const donorLogin = async (req, res) => {};

const donorRegister = async (req, res) => {
    try {
        const {name, email, password,  phone, bloodGroup, district, upazila, union } = req.body;

        // Email Validation
        if(!validator.isEmail(email)) {
            return res.json({success: flase, message: "Please Enter a Valid Email "});
        }
        // Check User 
        const existingDonor = await donorModel.findOne({email});
        if (existingDonor) {
            return res.json({success: true, message: "User Already Exists "});
        }
        // Password Validation
        if(password.length < 8){
            return res.json({success: flase, message: "Password lenght should be ewual or grater then 8 "});
        }
        // Hashing user password



        res.json({
            success: true,
            message: 'API is Connected successfully',
        })
    } catch (error) {
        console.log('Doner Register error', error);
        res.json({ success: true, message: error?.message});
        
    }
};

const adminLogin = async (req, res) => {};
const removeDonor = async (req, res) => {};
const updateDonor = async (req, res) => {};
const getDonor = async (req, res) => {
    res.send('Hello From Donor')
};


export {donorLogin, donorRegister, adminLogin, removeDonor, updateDonor, getDonor}