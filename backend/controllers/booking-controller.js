import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const newBooking = async ( req, res, next ) => {
    const { movie, date, seatNo, user } = req.body;

    let existingmovie;
    let existinguser;
    try{
        existingmovie=await Movie.findById(movie);
        existinguser=await User.findById(user);

    }
    catch(err){
        return console.log(err);
    }

    if(!existingmovie){
        return res.status(404).json({message:"Movie not found"});
    }
    if(!user){
        return res.status(404).json({message:"User not found"});
    }


    let booking;

    try {
        booking = new Booking( {
            movie, date: new Date( `${ date }` ), seatNo, user
        } );

        const session=await mongoose.startSession();
        session.startTransaction();
        existinguser.bookings.push(booking);
        existingmovie.bookings.push(booking);
        await existinguser.save({session});
        await existingmovie.save({session});
        await booking.save({session});
        session.commitTransaction();

    }
    catch ( err ) {
        return console.log( err );
    }

    if ( !booking ) {
        return res.status( 500 ).json( { message: "Unable to create booking" } )
    }
    return res.status( 201 ).json( { booking } );
}


export const getBookingId = async ( req, res, next ) => {
    const id = req.params.id;

    let booking;
    try{
        booking = await Booking.findById(id);

    }
    catch(err){
        return console.log(err);
    }

    if(!booking){
        return res.status(500).json({message:"Unexpexted error"});
    }
    
        return res.status(200).json({booking});
    
}

export const deleteBooking = async ( req, res, next ) => {
    const id = req.params.id;

    let booking;
    try{
        booking = await Booking.findByIdAndDelete(id).populate("user movie")
        console.log(booking);
        const session=await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.movie.save({session});
        await booking.user.save({session});
        await session.commitTransaction();
    }
    catch(err){
        return console.log(err);
    }

    if(!booking){
        return res.status(500).json({message:"Unexpexted error"});
    }
    
        return res.status(200).json({message:"Succesfully deleted"});
    
}

