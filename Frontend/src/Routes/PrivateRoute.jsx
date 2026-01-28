import React from 'react'
import useAuth from '../Hooks/useAuth'
import MainLoader from '../components/Loader/MainLoader';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {

    const {user, loading} = useAuth();

    if(loading){
        return <MainLoader />
    }

    if(!user){
        <Navigate to={"/login"}/>
    }
    return children;
}

export default PrivateRoute;
