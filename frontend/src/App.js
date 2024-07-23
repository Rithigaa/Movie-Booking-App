import React, { useEffect } from 'react';
import Header from './component/Header';
import { Route, Routes } from 'react-router-dom';
import HomePage from './component/HomePage';
import Movies from './component/movie/Movies';
import Admin from './component/auth/Admin';
import Auth from './component/auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from './store';
import Booking from './component/Bookings/Booking';
import UserProfile from './Profile/UserProfile';
import AddMovie from './component/movie/AddMovie';
import AdminProfile from './Profile/AdminProfile';

function App() {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector( ( state ) => state.admin.isLoggedIn );
  const isuserLoggedIn = useSelector( ( state ) => state.user.isLoggedIn );
  console.log( "isAdminLoggedIn", isAdminLoggedIn );
  console.log( "isUserLoggedIn", isuserLoggedIn );
  useEffect( () => {
    if ( localStorage.getItem( "userId" ) ) {
      dispatch( userActions.login() );
    }
    else if ( localStorage.getItem( "adminId" ) ) {
      dispatch( adminActions.login() );

    }
  }, [] )
  return (
    <div>

      <Header />
      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          {!isuserLoggedIn && !isAdminLoggedIn && (
            <>
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<Auth />} />
            </>
          )}

          {isuserLoggedIn && !isAdminLoggedIn && (
            <>
              <Route path="/user" element={<UserProfile />} />
              <Route path="/booking/:id" element={<Booking />} />
            </>
          )}

          {isAdminLoggedIn && !isuserLoggedIn && (
            <><Route path="/add" element={<AddMovie />} />
              <Route path="/user-admin" element={<AdminProfile />} />
            </> )}

        </Routes>
      </section>
    </div>
  );
}

export default App;


//5:02:20