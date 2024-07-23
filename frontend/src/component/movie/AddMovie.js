import { Box, Button, Checkbox, FormLabel, TextField , Typography } from '@mui/material'
import React, { useState } from 'react'
import { addMovie } from '../../api-helper/api-helpers';

const labelProps={
    mt:1,
    mb:1
}
function AddMovie() {
    const [Inputs, setInputs] = useState({
        title:"",
        description:"",
        posterUrl:"",
        releasedate:"",
        featured:false
    });
    const [Actors, setActors] = useState([]);
    const [Actor, setActor] = useState("");
    const handleChange=(e)=>{
        setInputs((prevState)=>({
            ...prevState,[e.target.name]:e.target.value,
        }))
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(Inputs,Actors);
        addMovie({...Inputs,Actors})
        .then(res=>console.log(res))
        .catch((err)=>console.log(err));
    };
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <Box 
            width={"50%"} 
            margin={"auto"} 
            padding={10} 
            display={"flex"} 
            flexDirection={"column"} 
            boxShadow={"10px 10px 20px #ccc"}>
                <Typography textAlign={"center"} variant='h5' fontFamily={"verdana"}>
                    Add New Movie
                </Typography>
                <FormLabel sx={{labelProps}}>Title</FormLabel>
                <TextField value={Inputs.title} onChange={handleChange} name="title" variant='standard' margin='normal'/>
                <FormLabel sx={{labelProps}}>Description</FormLabel>
                <TextField value={Inputs.description} onChange={handleChange} name="description" variant='standard' margin='normal'/>
                <FormLabel sx={{labelProps}}>Poster Url</FormLabel>
                <TextField value={Inputs.posterUrl} onChange={handleChange} name="posterUrl" variant='standard' margin='normal'/>
                <FormLabel sx={{labelProps}}>Release Date</FormLabel>
                <TextField  type={"date"} value={Inputs.releasedate} onChange={handleChange} name="releasedate" variant='standard' margin='normal'/>
                <FormLabel sx={{labelProps}}>Actors</FormLabel>
                <Box display={"flex"}>
                <TextField  
                value={Actor}
                name="actor" 
                variant='standard' 
                margin='normal'
                onChange={(e)=>setActor(e.target.value)}
                />
                <Button onClick={()=>{
                    setActors([...Actors,Actor]);
                    setActor("");
                    }}>Add</Button>
                </Box>
                <FormLabel sx={{labelProps}}>Featured</FormLabel>
                <Checkbox name="featured" checked={Inputs.featured} onClick={(e)=>setInputs((prevState)=>({...prevState,featured:e.target.checked,

                }))
            } 
                sx={{mr:"auto"}} />
                <Button type="submit" variant="contained" sx={{width:"30%", margin:"auto", bgcolor:"#2b2d42",":hover":{
                    bgcolor:"#808080"
                }}}>Add</Button>
                
                
            </Box>
        </form>
    </div>
  )
}

export default AddMovie