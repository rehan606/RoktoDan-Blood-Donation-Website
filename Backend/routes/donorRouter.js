import express from "express";
import { adminLogin, donorLogin, donorRegister, getDonor, removeDonor, updateDonor } from "../controllers/donorController.js";

const donorRouter = express.Router();

donorRouter.post('/register', donorRegister)
donorRouter.post('/login', donorLogin);
donorRouter.post('/admin', adminLogin);
donorRouter.post('/remove', removeDonor);
donorRouter.put('/update/:id', updateDonor);
donorRouter.get('/donors', getDonor);

donorRouter.get('/donors', (req, res) => {
    res.send("Donor router connected successfully");
});

export default donorRouter;