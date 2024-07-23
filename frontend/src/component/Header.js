import React, { useEffect } from 'react'
import { useState } from 'react';
import { AppBar, Autocomplete, Box, IconButton, Tab, Tabs, TextField, Toolbar } from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie'
import { getAllMovie } from '../api-helper/api-helpers';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from '../store';


const Header = () => {
const dispatch=useDispatch();
    const navigate=useNavigate();
    const isAdminLoggedIn = useSelector( ( state ) => state.admin.isLoggedIn );
    const isuserLoggedIn = useSelector( ( state ) => state.user.isLoggedIn );

    const [ value, setvalue ] = useState( 0 );
    const [ movies, setmovies ] = useState( [] )

    const [selectedMovie, setselectedMovie] = useState();

    useEffect( () => {
        getAllMovie().then( ( data ) => setmovies( data.movies ) )
            .catch( ( err ) => console.log( err ) )
    }, [] )

    const logout=(isAdmin)=>{
        dispatch(isAdmin?adminActions.logout():userActions.logout());
        
    }

    const handleChange=(e,val)=>{
        setselectedMovie(val);
        const movie=movies.find((m)=>m.title==val);
        console.log(movie._id);
        if(isuserLoggedIn){
         navigate(`/booking/${movie._id}`); 
        }
        if(isAdminLoggedIn){
            navigate(`/booking/${movie._id}`)
        }
    }

    return (
        <AppBar sx={{ bgcolor: "#2b2d42" }} position='sticky'>
            <Toolbar>
                <Box width={"20%"}>
                    <IconButton LinkComponent={Link} to="/">
                    <MovieIcon sx={{color:"#fff"}}/>
                    </IconButton>
                </Box>
                <Box width={"30%"} margin="auto">
                    <Autocomplete
                    onChange={handleChange}
                        freeSolo
                        options={movies && movies.map( ( option ) => option.title )}
                        renderInput={( params ) =>
                            <TextField
                                sx={{ input: { color: "#fff" } }}
                                variant='standard'{...params}
                                placeholder="Search for movies" />}
                    />
                </Box>
                <Box display={'flex'}>
                    <Tabs
                        value={value}
                        onChange={( e, val ) => setvalue( val )}
                        textColor='inherit'
                        indicatorColor='secondary'>
                        <Tab LinkComponent={Link} to="/movies" label="Movies" />
                        {!isAdminLoggedIn && !isuserLoggedIn && [
                            <Tab key="auth"  LinkComponent={Link} to="/auth" label="Auth" />,
                            <Tab key="admin" LinkComponent={Link} to="/admin" label="Admin" />,
                        ]}
                        {isuserLoggedIn &&
                        [
                            <Tab key={"profile"}  LinkComponent={Link} to="/user" label="Profile" />,
                            <Tab key={"logout"} onClick={()=>logout(false)} LinkComponent={Link} to="/" label="Logout" />,

                        ]
                        }
                        {isAdminLoggedIn &&
                        [
                            <Tab  LinkComponent={Link} to="/add" label="Add Movie" />,
                            <Tab  LinkComponent={Link} to="/user-admin" label="Profile" />,
                            <Tab onClick={()=>logout(true)}  LinkComponent={Link} to="/" label="Logout" />,

                        ]
                        }
                    </Tabs>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;