import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieDetails, newBooking } from '../../api-helper/api-helpers';
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';

const Booking = () => {
    const [ movie, setmovies ] = useState();
    const id = useParams().id;

    const [ inputs, setinputs ] = useState( { seatNumber: "", date: "" } )

    useEffect( () => {
        getMovieDetails( id ).then( ( res ) => setmovies( res.movie ) )
            .catch( ( err ) => console.log( err ) );
    }, [ id ] )

    const handlechange = ( e ) => {
        setinputs( ( prevState ) =>

            ( { ...prevState, [ e.target.name ]: e.target.value } ) )
    };

    const handlesubmit = ( e ) => {
        e.preventDefault();
        console.log( inputs );

        newBooking( { ...inputs, movie:id } )
            .then( ( res ) => {
                console.log( res );
            } )
            .catch( ( err ) => console.log( err ) );
    };
    return (
        <div>
            {movie && <Fragment>
                <Typography
                    padding={3}
                    fontFamily={"fantasy"}
                    variant='h4'
                    textAlign={"center"}>
                    Book Tickets of Movie :{movie.title}
                </Typography>
                <Box display={"flex"}
                    justifyContent={"center"}
                >
                    <Box
                        display={"flex"}
                        justifyContent={"column"}
                        flexDirection="column"
                        padding={3}
                        width={"50%"}
                        marginRight={"auto"}>

                        <img width={"70%"} height={"200px"}
                            src={movie.posterurl} alt={movie.title}></img>
                        <Box width={"80%"} marginTop={3} padding={2}>
                            <Typography variant='h6' padding={2}>{movie.description}</Typography>
                            <Typography fontWeight={"bold"} marginTop={1} >
                                Actors:
                                {movie.actors.map( ( actor ) => " " + actor + " " )}
                            </Typography>
                            <Typography fontWeight={"bold"} marginTop={1}>Release Date:{new Date( movie.releaseDate ).toDateString()}</Typography>
                        </Box>
                    </Box>
                    <Box width={"50%"} paddingTop={3}>
                        <form onSubmit={handlesubmit} >
                            <Box padding={5} margin={"auto"} display={"flex"} flexDirection={"column"}>
                                <FormLabel>
                                    Seat Number
                                </FormLabel>
                                <TextField
                                    value={inputs.seatNumber}
                                    onChange={handlechange}
                                    name="seatNumber"
                                    type={'number'}
                                    margin='normal'
                                    variant='standard' />
                                <FormLabel>
                                    Booking Date
                                </FormLabel>
                                <TextField
                                    value={inputs.date}
                                    onChange={handlechange}
                                    name="date"
                                    type={'date'}
                                    margin='normal'
                                    variant='standard'
                                />
                                <Button onSubmit={handlesubmit} type='submit' sx={{ mt: 3 }}>
                                    Book Now
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Fragment>}
        </div>
    )
}

export default Booking