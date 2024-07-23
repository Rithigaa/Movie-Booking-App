import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MovieItem from './movie/MovieItem'
import { Link } from 'react-router-dom'
import { getAllMovie } from '../api-helper/api-helpers'

const HomePage = () => {
  const [ movies, setmovies ] = useState( [] );
  useEffect( () => {
    getAllMovie()
      .then( ( data ) => setmovies( data.movies ) )
      .catch( ( err ) => console.log( err ) );
  }, [] )

  return (
    <Box width={"100%"} height={"100%"} margin="auto" marginTop={2}  >
      <Box margin="auto" width={"80%"} height={"50vh"} padding={2}>
        <img src="https://assets-in.bmscdn.com/discovery-catalog/events/et00064311-qlrugpsyqu-landscape.jpg"
          alt="bad-boy"
          width={"100%"}
          height={"150%"}
        ></img>
      </Box>
      <Box paddingTop={20} margin="auto">
        <Typography variant='h4' textAlign={"center"}>
          Latest Release
        </Typography>
      </Box>
      <Box
        display="flex"
        width="80%"
        justifyContent="center"
        margin={10}
      >
        {movies && movies.slice(0,4).map( ( movie, index ) => 
          <MovieItem id={movie._id} title={movie.title} posterurl={movie.posterurl} releaseDate={movie.releaseDate} key={index} />
        ) }
      </Box>
      <Box display={"flex"} padding={5} margin={"auto"}>
        <Button LinkComponent={Link} to="/movies" variant='outlined'
          sx={{ margin: "auto", color: "#2b2d42" }}>
          View All Movies
        </Button>
      </Box>
    </Box>
  )
}

export default HomePage