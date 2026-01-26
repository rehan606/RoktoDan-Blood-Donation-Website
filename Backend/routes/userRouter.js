import express from "express";

const userRouter = express.Router();

userRouter.get('/users', (req, res) => {
    res.send("user router connected successfully");
});

export default userRouter;