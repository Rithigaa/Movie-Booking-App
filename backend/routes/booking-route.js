import express from "express"
import { deleteBooking, getBookingId, newBooking } from "../controllers/booking-controller.js"

const bookingRouter=express.Router()

bookingRouter.get("/:id",getBookingId)
bookingRouter.post("/",newBooking)
bookingRouter.delete("/:id",deleteBooking)

export default bookingRouter