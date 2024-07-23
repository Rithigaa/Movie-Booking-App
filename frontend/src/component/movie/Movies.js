import { Box, Typography } from '@mui/material'
import React, { useEffect,useState } from 'react'
import { getAllMovie } from '../../api-helper/api-helpers'
import MovieItem from './MovieItem';

const Movies = () => {
  const [ movies, setmovies ] = useState( [] );
  useEffect( () => {
    getAllMovie()
      .then( ( data ) =>setmovies( data.movies ) )
      .catch( ( err ) => console.log( err ) )
  }, [] )

  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography
        margin={"auto"}
        variant='h4'
        padding={2}
        width={"40%"}
        color={"white"}
        textAlign={"center"}
        bgcolor={"#900C3F"}>
        All Movies
      </Typography>
      <Box 
      width={"100%"} 
      margin={"auto"} 
      marginTop={5}
      display={"flex"} 
      justifyContent={"flex-start"} 
      flexWrap={"wrap"}>
      {movies && movies.map( ( movie, index ) => 
    
          <MovieItem  
          key={index}
          title={movie.title} 
          releaseDate={movie.releaseDate} 
          posterurl={movie.posterurl} 
          id={movie._id}   />
        ) }
      </Box>
    </Box>
  )
}

export default Movies