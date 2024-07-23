import { Box, Button, Dialog, FormLabel, Icon, IconButton, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Link } from 'react-router-dom'

const labeStyle = { mt: 1, mb: 1 }
const AuthForm = ( { onSubmit, isAdmin } ) => {
    const [ inputs, setinputs ] = useState( {
        name: "",
        email: "",
        password: "",
    } );
    const [ isSignup, setisSignup ] = useState( false );
    const handleChange = ( e ) => {
        setinputs( ( prevState ) => ( {
            ...prevState,
            [ e.target.name ]: e.target.value,
        } ) )
    }

    const handleSubmit = ( e ) => {
        e.preventDefault();
        onSubmit( { inputs, signup: isAdmin?false:isSignup } );
    }
    return (
        <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
            <Box sx={{ ml: "auto", padding: 1 }}>
                <IconButton LinkComponent={Link} to="/">
                    <CloseRoundedIcon />
                </IconButton>

            </Box>
            <Typography variant="h4" textAlign={"center"}>
                {isSignup ? "SignUp" : "Login"}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box
                    padding={3}
                    display={"flex"}
                    justifyContent={"center"}
                    flexDirection={"column"}
                    width={350}
                    margin={"auto"}
                >
                    {!isAdmin && isSignup && (
                        <>
                            {" "}
                            <FormLabel sx={labeStyle}>Name</FormLabel>
                            <TextField
                                value={inputs.name}
                                onChange={handleChange}
                                margin='normal'
                                variant='standard'
                                type={'text'}
                                name='name'
                            />
                        </>
                    )}
                    <FormLabel sx={labeStyle}>Email</FormLabel>
                    <TextField
                        value={inputs.email}
                        onChange={handleChange}
                        margin='normal'
                        variant='standard'
                        type={'email'}
                        name='email' />
                    <FormLabel sx={labeStyle}>Password</FormLabel>
                    <TextField
                        value={inputs.password}
                        onChange={handleChange}
                        margin='normal'
                        variant='standard'
                        type={'password'}
                        name='password' />
                    <Button
                        sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }}

                        variant='contained'
                        type='submit'
                    >
                        {isSignup ? "SignUp" : "Login"}

                    </Button>
                    {!isAdmin && ( <Button onClick={() => setisSignup( !isSignup )}
                        sx={{ mt: 2, borderRadius: 10 }}

                    >
                        Switch To {isSignup ? "Login" : "SignUp"}
                    </Button> )}
                </Box>
            </form>
        </Dialog>
    )
}

export default AuthForm