import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PublicRoute = () => {
    
    // const user = window.localStorage.getItem('user');

    const { user } = useSelector(state => state.auth);
    const { ROLE } = useSelector(state => state.auth);

    const location = useLocation();

    return(

        user ? <Navigate to={ROLE === 'ADMIN_ROLE' ? '/inicio' : '/acerca-de'} state={{ from: location }} replace /> : <Outlet />
    
    )
}

export default PublicRoute