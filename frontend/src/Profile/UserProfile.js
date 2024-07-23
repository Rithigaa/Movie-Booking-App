import React, { Fragment, useEffect, useState } from 'react'
import { deleteBooking, getMovieDetails, getUserBooking, getUserDetails } from '../api-helper/api-helpers'
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import AccountcircleIcon from "@mui/icons-material/AccountCircle"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"

const UserProfile = () => {
  const id = localStorage.getItem( "userId" );
  const [ bookings, setBookings ] = useState();
  const [ user, setuser ] = useState();
  const [ moviedetails, setmoviedetails ] = useState({});

  useEffect( () => {
    getUserBooking()
      .then( async ( res ) => {
        setBookings( res.bookings );

          for (const book of res.bookings) {
            const movieRes = await getMovieDetails(book.movie);
            if (movieRes) {
              moviedetails[book.movie] = movieRes.movie;
            }
          }
          setmoviedetails(moviedetails);
      } )
      .catch( ( err ) => console.log( err ) );
  }, [] );

  useEffect( () => {
    getMovieDetails()
      .then( ( res ) => {
        setmoviedetails( res.moviedetails );
        
      } )
      .catch( ( err ) => console.log( err ) );
  }, [] );

  useEffect( () => {
    getUserDetails( id )
      .then( ( res ) => {
        setuser( res.user );
      } )
      .catch( ( err ) => console.log( err ) );

  }, [ id ] )
  if ( !user ) {
    return <Typography>Loading...</Typography>;
  }

const handleDelete=(id)=>{
  deleteBooking(id)
  .then((res)=>console.log(res))
  .catch((err)=>console.log(err));
}

  return (

    <Box width={"100%"} display={"flex"}>

      <Box
        width={"30%"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        padding={3}
      >
        <AccountcircleIcon sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }} />
        <Typography
          padding={1}
          width={"auto"}
          textAlign={"center"}
          border={"1px solid #ccc"}
          borderRadius={6}>
          Name: {user.name}
        </Typography>
        <Typography
          mt={1}
          padding={1}
          width={"auto"}
          textAlign={"center"}
          border={"1px solid #ccc"}
          borderRadius={6}>
          Email: {user.email}
        </Typography>
      </Box>
      <Box width={"70%"} display={"flex"} flexDirection={"column"}>
        <Typography
          variant='h3'
          fontFamily={"verdana"}
          textAlign={"center"}
          padding={2}
        >Bookings
        </Typography>

        <Box margin={"auto"}
          display={"flex"}
          flexDirection={"column"}
          width={"80%"}>
          <List>
            {bookings.map( ( booking, i ) => (
              <ListItem key={i} sx={{ bgcolor: "#ADD8E6", color: "white", textAlign: "center", margin: 1 }}>
                <ListItemText sx={{ margin: 1, width: "auto", textAlign: "left" }}>
                  Movie: {moviedetails[booking.movie]?.title || booking.title}| ID:{booking._id} | Date: {new Date( booking.date ).toLocaleDateString()} | Seat: {booking.seatNo}
                </ListItemText>

              <IconButton color="error" onClick={()=>handleDelete(booking._id)}>
                <DeleteForeverIcon color='red'/>

              </IconButton>

              </ListItem>
            ) )}
          </List>
        </Box>
      </Box>

    </Box>
  )
}

export default UserProfile



