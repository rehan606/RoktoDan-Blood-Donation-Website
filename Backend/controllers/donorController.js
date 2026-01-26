import validator from 'validator';
import donorModel from "../models/donorModels.js";

const donorLogin = async (req, res) => {};

const donorRegister = async (req, res) => {
    try {
        // phone, bloodGroup, district, upazila, union
        const {name, email, password,   } = req.body; 
        
        if (!name) {
            return res.json({success: false, message: "User Name is required ",});
        }

        if (!email) {
            return res.json({success: false, message: "Email is required ",});
        }
        if (!password) {
            return res.json({success: false, message: "Password is required ",});
        }
        // if (!phone) {
        //     return res.json({success: false, message: "phone  is required ",});
        // }

        // Email Validation
        if(!validator.isEmail(email)) {
            return res.json({success: false, message: "Please Enter a Valid Email ",});
        }
        // Check User 
        const existingDonor = await donorModel.findOne({email});
        if (existingDonor) {
            return res.json({success: true, message: "User Already Exists "});
        }
        // Password Validation
        if(password.length < 8){
            return res.json({success: false, message: "Password lenght should be ewual or grater then 8 "});
        }
        // Hashing user password

        // ======== Register a New User in Database ========
        const newDonor = new donorModel({
            name, email, password
        });

        // ======== Save User in Database ========
        await newDonor.save()




        res.json({
            success: true,
            message: 'User registered successfully',
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