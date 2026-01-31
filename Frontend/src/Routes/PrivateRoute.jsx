import React from 'react'
import useAuth from '../Hooks/useAuth'
import MainLoader from '../components/Loader/MainLoader';
// import { useNavigate } from 'react-router';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {

    const {user, loading} = useAuth();
    const location = useLocation();
    //  const navigate = useNavigate();

    if(loading){
        return <MainLoader />
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
}

export default PrivateRoute;
