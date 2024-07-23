import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import Movie from "../models/Movie.js";
import Admin from "../models/Admin.js";

export const addMovie = async ( req, res, next ) => {

    const extractedToken = req.headers.authorization.split( " " )[ 1 ];
    if ( !extractedToken && extractedToken.trim() === "" ) {
        return res.status( 404 ).json( { message: "Token not found" } );
    }
    let adminId;

    jwt.verify( extractedToken, process.env.SECRET_KEY, ( err, decryted ) => {
        if ( err ) {
            return res.status( 400 ).json( { message: `${ err.message }` } )
        }
        else {
            adminId = decryted.id;
            return;
        }
    } )
    // try {
    //     const decrypted = jwt.verify(extractedToken, process.env.SECRET_KEY);
    //     adminId = decrypted.id;
    // } catch (err) {
    //     return res.status(400).json({ message: `${err.message}` });
    // }
    const { title, description, releaseDate, posterurl, actors, featured } = req.body;
    if (
        !title &&
        title.trim() === "" &&
        !description &&
        description.trim() === "" &&
        !posterurl &&
        posterurl.trim() === "" ) {
        return res.status( 422 ).json( { message: "Invalid inputs" } );
    }


    let movie;
    try {
        movie = new Movie( {
            title,
            description,
            posterurl,
            releaseDate: new Date( `${ releaseDate }` ),
            actors,
            admin: adminId,
            featured
        } );

        const session=await mongoose.startSession();
        const adminUser=await Admin.findById(adminId)
        session.startTransaction();
        await movie.save({session});
        adminUser.addedMovies.push(movie);
        await adminUser.save({session});
        await session.commitTransaction();

    }
    catch ( err ) {
        return console.log( err );
    }

    if ( !movie ) {
        return res.status( 500 ).json( { message: "Required Error" } )
    }
    return res.status( 201 ).json( { movie } );

}

export const getAllMovie = async ( req, res, next ) => {
    let movies;
    try {
        movies = await Movie.find();
    }
    catch ( err ) {
        return console.log( err );
    }
    if ( !movies ) {
        return res.status( 500 ).json( { message: "Request failed" } )
    }
    return res.status( 200 ).json( { movies } );
}


export const getMovie=async(req,res,next)=>{
    const id=req.params.id;
    let movie;
    try{
        movie=await Movie.findById(id)
    }
    catch(err){
        return console.log(err);
    }
    if ( !movie ) {
        return res.status( 404 ).json( { message: "Invalid movie" } )
    }
    return res.status( 200 ).json( { movie } );

    
}