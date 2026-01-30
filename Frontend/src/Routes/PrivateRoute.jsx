import React from 'react'
import useAuth from '../Hooks/useAuth'
import MainLoader from '../components/Loader/MainLoader';
import { useNavigate } from 'react-router';

const PrivateRoute = ({children}) => {

    const {user, loading} = useAuth();
     const navigate = useNavigate();

    if(loading){
        return <MainLoader />
    }

    if(!user){
        navigate("/login");
    }
    return children;
}

export default PrivateRoute;
