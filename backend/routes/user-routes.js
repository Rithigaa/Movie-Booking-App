import express from "express";
import { deleteUser, getAllUsers, getBookingOffer, getUser, login, signup, updateUser } from "../controllers/user-controller.js";

const userRouter= express.Router();

userRouter.get("/",getAllUsers);
userRouter.get("/:id",getUser);
userRouter.post("/signup",signup);
userRouter.put("/:id",updateUser);
userRouter.delete("/:id",deleteUser)
userRouter.post("/login",login)
userRouter.get("/bookings/:id",getBookingOffer)

export default userRouter;