import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const addAdmin = async ( req, res, next ) => {
    const { email, password } = req.body;

    let existAdmin;
    try {
        existAdmin = await Admin.findOne( { email } )
    }
    catch ( err ) {
        return console.log( err )
    }
    if ( existAdmin ) {
        return res.status( 400 ).json( { message: "Admin already exists" } )
    }
    let admin;
    const hashedPassword = bcrypt.hashSync( password );
    try {
        admin = new Admin( { email, password: hashedPassword } )
        admin = await admin.save();
    }
    catch ( err ) {
        return console.log( err )
    }
    if ( !admin ) {
        return res.status( 500 ).json( { message: "Unable to create admin" } )
    }
    return res.status( 201 ).json( { admin } )

}

export const adminLogin = async ( req, res, next ) => {
    const { email, password } = req.body;

    if ( !email && email.trim() === "" && !password && password.trim() === "" ) {
        return res.status( 422 ).json( { message: "Inavlid inputs" } );
    }
    let existAdmin;
    try {
        existAdmin = await Admin.findOne( { email } );
    }
    catch ( err ) {
        return console.log( err );
    }
    if ( !existAdmin ) {
        return res.status( 400 ).json( { message: "Admin not found" } )
    }

    const isPasswordCorrect = bcrypt.compareSync( password, existAdmin.password )
    if ( !isPasswordCorrect ) {
        return res.status( 400 ).json( { message: "Password incorrect" } )
    }
    // const secretKey = process.env.SECRET_KEY || 'your-fallback-secret-key';
    // const token = jwt.sign({ id: existAdmin._id }, secretKey, {
    //     expiresIn: "10d",
    // });
    const token=jwt.sign({id:existAdmin._id },process.env.SECRET_KEY)

    return res.status( 200 ).json( { message: "Authentication complete",token,id:existAdmin._id } )
}

export const getAllAdmin = async ( req, res, next ) => {
    let admins;
    try {
        admins = await Admin.find()
    }
    catch ( err ) {
        return console.log( err )
    }
    if ( !admins ) {
        return res.status( 500 ).json( { message: "Internal server error" } )
    }
    
    return res.status( 200 ).json( { admins } )

}

export const getAdminById= async ( req, res, next ) => {
    let admin;
    const id = req.params.id;
    try {
        admin = await Admin.findById( id )
    }
    catch ( err ) {
        return console.log( err );
    }
    if ( !admin ) {
        return res.status( 500 ).json( { message: "No admin found" } )
    }
    return res.status( 200 ).json( { admin } );

}



