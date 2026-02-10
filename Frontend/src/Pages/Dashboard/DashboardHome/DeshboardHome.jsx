import React from 'react'
import useUserRole from '../../../Hooks/useUserRole'
import DashboardLoader from '../../../components/Loader/DashboardLoader';
import UserDashboard from './UserDashboard';
import DonorDashboard from './DonorDashboard';
import AdminDashboard from './AdminDashboard';
import Forbidden from '../ForbiddenPage/Forbidden';
import ProfilePage from '../ProfilePage/ProfilePage'

const DeshboardHome = () => {
    const { role, roleLoading} = useUserRole();

    if( roleLoading) {
        return <DashboardLoader/>
    }

    if(role === 'user') {
        return <UserDashboard/>
    } 
    else if (role === 'donor') {
        return <ProfilePage />
    }
    else if (role === 'admin') {
        return <AdminDashboard/>
    }
    else {
        return <Forbidden/>
    }
}

export default DeshboardHome
