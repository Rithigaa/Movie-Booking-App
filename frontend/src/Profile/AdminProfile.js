import React, {useEffect, useState } from 'react'
import {  getAdminById, getMovieDetails, getMovieName } from '../api-helper/api-helpers'
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import AccountcircleIcon from "@mui/icons-material/AccountCircle"

const AdminProfile = () => {
    const id = localStorage.getItem( "adminId" );

    const [ admin, setadmin ] = useState([]);
    const [ movies, setmovie ] = useState([]);

    useEffect( () => {
        getAdminById(id)
            .then( async( res ) => {
                setadmin( res.admin );
                const array=[]
                for (const movieId of res.admin.addedMovies) {
                    const movieRes = await getMovieName(movieId);
                    const mt=movieRes.movie.title;
                    if (movieRes) {
                     array.push(mt);
                    }
                  }
                  setmovie(array);
            } )
            .catch( ( err ) => console.log( err ) );
    }, [] );


    if ( !admin ) {
        return <Typography>Loading...</Typography>;
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
                    mt={1}
                    padding={1}
                    width={"auto"}
                    textAlign={"center"}
                    border={"1px solid #ccc"}
                    borderRadius={6}>
                    Email: {admin.email}
                </Typography>
            </Box>

            <Box width={"70%"} display={"flex"} flexDirection={"column"}>
                <Typography
                    variant='h3'
                    fontFamily={"verdana"}
                    textAlign={"center"}
                    padding={2}
                >Added Movies
                </Typography>

                { admin  && admin.addedMovies &&admin.addedMovies.length >0 &&(
                    <Box margin={"auto"}
                        display={"flex"}
                        flexDirection={"column"}
                        width={"80%"}>
                        <List>
                            {movies.map( ( movie, i ) => (
                                <ListItem key={i} sx={{ bgcolor: "#708090", color: "white", textAlign: "center", margin: 1 }}>
                                    <ListItemText sx={{ margin: 1, width: "auto", textAlign: "left" }}>
                                        Movie: {movie}
                                    </ListItemText>


                                </ListItem>
                            ) )}
                        </List>
                    </Box>)}
            </Box>

        </Box>
    )
}

export default AdminProfile



