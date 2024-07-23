import axios from "axios";

export const getAllMovie = async () => {
    try {
        const res = await axios.get( "/movie" );
        if ( res.status !== 200 ) {
            console.log( "No data" );
            return;
        }
        const data = res.data;
        return data;
    } catch ( err ) {

        console.log( err );
    }
};

export const sendUserAuthRequest = async ( data, signup ) => {
    try {
        const res = await axios.post( `/user/${ signup ? "signup" : "login" }`, {
            name: signup ? data.name : "",
            email: data.email,
            password: data.password
        } );

        if ( res.status !== 200 && res.status !== 201 ) {
            console.log( "Unexpected error occurred" );
            return null;
        }

        const resData = await res.data;
        return resData;
    } catch ( err ) {
        console.log( err );
    }
};

export const sendAdminAuthRequest = async ( data ) => {
    try {
        const res = await axios.post( "/admin/login", {
            email: data.email,
            password: data.password
        } );

        if ( res.status !== 200 ) {
            console.log( "Unexpected error occurred" );
            return null;
        }

        const resData = await res.data;
        return resData;
    } catch ( err ) {
        console.log( err );
    }
};

export const getMovieName = async ( id ) => {
    try {
        const res = await axios.get( `/movie/${ id }` )

        if ( res.status !== 200 ) {
            console.log( "Unexpected error occurred" );
            return null;
        }

        const resData = await res.data;
        return resData;
    } catch ( err ) {
        console.log( err );
    }

}

export const getMovieDetails = async ( id ) => {
    try {
        const res = await axios.get( `/movie/${ id }` )

        if ( res.status !== 200 ) {
            console.log( "Unexpected error occurred" );
            return null;
        }

        const resData = await res.data;
        return resData;
    } catch ( err ) {
        console.log( err );
    }

}
export const getUserDetails = async ( id ) => {
    try {
        const res = await axios.get( `/user/${ id }` )

        if ( res.status !== 200 ) {
            console.log( "Unexpected error occurred" );
            return null;
        }

        const resData = await res.data;
        return resData;
    } catch ( err ) {
        console.log( err );
    }

}

export const newBooking = async ( data ) => {
    try {
        console.log(data);
        const res = await axios
        .post( "/booking",
            {
                movie: data.movie,
                seatNo: data.seatNumber,
                date: data.date,
                user: localStorage.getItem( "userId" ),
            })
            
        if ( res.status !== 201 ) {
            console.log( "Unexpected error occurred" );
            return null;
        }
        
        const resData = await res.data;
        return resData;
    } catch ( err ) {
        console.log( err );
    }                       

}

export const getUserBooking = async () => {
    try {
        const id= localStorage.getItem("userId");
    
        const res = await axios
        .get(`/user/bookings/${id}`)
            
        if ( res.status !== 200 ) {
            console.log( "Unexpected error occurred" );
            return null;
        }
        
        const resData = await res.data;
        return resData;
    } catch ( err ) {
        console.log( err );
    }                       

}

export const deleteBooking = async (id) => {
    try {
         const res = await axios
        .delete(`/booking/${id}`)
            
        if ( res.status !== 200 ) {
            console.log( "Unexpected error occurred" );
            return null;
        }
        
        const resData = await res.data;
        return resData;
    } catch ( err ) {
        console.log( err );
    }                       

}

export const addMovie = async ( data ) => {
    try {
        
        const res = await axios
        .post( "/movie/add",
            {
                title:data.title,
                description:data.description,
                releaseDate:data.releasedate,
                posterurl:data.posterUrl,
                featured:data.featured,
                actors:data.Actors,
                admin: localStorage.getItem( "adminId" ),
            },{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            },
        );
            
        if ( res.status !== 201 ) {
            console.log( "Unexpected error occurred" );
            return null;
        }
        
        const resData = await res.data;
        return resData;
    } catch ( err ) {
        console.log( err );
    }                       

}


export const getAdminById = async ( id ) => {
    try {
        const res = await axios.get( `/admin/${ id }` )

        if ( res.status !== 200 ) {
            console.log( "Unexpected error occurred" );
            return null;
        }

        const resData = await res.data;
        return resData;
    } catch ( err ) {
        console.log( err );
    }

}