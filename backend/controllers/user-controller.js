import User from "../models/User.js";
import bcrypt from "bcryptjs"
import mongoose from "mongoose";
import express from "express"
import Booking from "../models/Booking.js";

export const getAllUsers = async ( req, res, next ) => {
    let users;
    try {
        users = await User.find()
    }
    catch ( err ) {
        return console.log( err );
    }
    if ( !users ) {
        return res.status( 500 ).json( { message: "No users found" } )
    }
    return res.status( 200 ).json( { users } );
}

export const getUser = async ( req, res, next ) => {
    let user;
    const id = req.params.id;
    try {
        user = await User.findById( id )
    }
    catch ( err ) {
        return console.log( err );
    }
    if ( !user ) {
        return res.status( 500 ).json( { message: "No users found" } )
    }
    return res.status( 200 ).json( { user } );
}


export const signup = async ( req, res, next ) => {
    const { name, email, password } = req.body;

    if ( !name && name.trim() === "" && !email && email.trim() === "" && !password && password.trim() === "" ) {
        return res.status( 422 ).json( { message: "Inavlid inputs" } );
    }
    const hashedPassword = bcrypt.hashSync( password )
    let user;
    try {
        user = new User( { name, email, password: hashedPassword } );
        user = await user.save();
    }
    catch ( err ) {
        return console.log( err );
    }

    if ( !user ) {
        return res.status( 500 ).json( { message: "Unexpexted Error" } )
    }
    return res.status( 201 ).json( { id: user._id } );

}

export const updateUser = async ( req, res, next ) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    if ( !name && name.trim() === "" && !email && email.trim() === "" && !password && password.trim() === "" ) {
        return res.status( 422 ).json( { message: "Inavlid inputs" } );
    }
    const hashedPassword = bcrypt.hashSync( password )
    let user;
    try {
        user = await User.findByIdAndUpdate( id, { name, email, password: hashedPassword } );
    }
    catch ( err ) {
        return console.log( err );
    }

    if ( !user ) {
        return res.status( 500 ).json( { message: "Unexpexted Error" } )
    }
    return res.status( 200 ).json( { message: "Updated Successfully" } );

}

export const deleteUser = async ( req, res, next ) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findByIdAndDelete( id )
    }
    catch ( err ) {
        return console.log( err );
    }

    if ( !user ) {
        return res.status( 500 ).json( { message: "Unexpexted Error" } )
    }
    return res.status( 200 ).json( { message: "Deleted Successfully" } );

}

export const login = async ( req, res, next ) => {
    const { email, password } = req.body;
    let existingUser
    if ( !email && email.trim() === "" && !password && password.trim() === "" ) {
        return res.status( 422 ).json( { message: "Inavlid inputs" } );
    }
    try {
        existingUser = await User.findOne( { email } );
    }
    catch ( err ) {
        return console.log( err );
    }
    if ( !existingUser ) {
        return res.status( 404 ).json( { message: "User not found" } )
    }

    const isPasswordCorrect = bcrypt.compareSync( password, existingUser.password )

    if ( !isPasswordCorrect ) {
        return res.status( 400 ).json( { message: "Password incorrect" } )
    }
    return res.status( 200 ).json( { message: "Logined Successfully", id: existingUser._id } );

}

export const getBookingOffer = async ( req, res, next ) => {
    const id = req.params.id;

    let bookings;
    try {
        bookings = await Booking.find( { user: id } );
    }
    catch ( err ) {
        return console.log( err );
    }

    if ( !bookings ) {
        return res.status( 500 ).json( { message: "Unexpexted error" } );
    }

    return res.status( 200 ).json( { bookings } );

}