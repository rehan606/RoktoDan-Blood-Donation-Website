import React, { useState } from 'react'
import { Outlet } from 'react-router'
import MainLoader from '../components/Loader/MainLoader';
import Navbar from '../components/Navbar/Navbar';

const MainLayout = () => {

    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState("bn");

    // Simulate loading for demonstration purposes
    setTimeout(() => {
        setLoading(false);
    }, 2000);

    if (loading) {
        return <MainLoader />;
    }

    return (
        <div className={language === "bn" ? "font-bn" : "font-en"}>
            <Navbar language={language} setLanguage={setLanguage} />
            
            <Outlet context={{ language }}/>
        </div>
    )
}

export default MainLayout
