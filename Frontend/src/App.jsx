import React from "react";
import { createBrowserRouter,  } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from "./Layouts/MainLayout";
import Home from "./Pages/Home/Home";
import Contact from "./Pages/Contact/Contact";
import RequestBlood from "./Pages/RequestBlood/RequestBlood";
import Donors from "./Pages/Donors/Donors";
import Eligibility from "./Pages/Eligibility/Eligibility";
import DonationBenefits from "./Pages/DonationBenefits/DonationBenefits";
import FAQ from "./Pages/FAQ/Faq";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import ScrollToTop from "./components/ScrollTop/ScrollToTop";
import BecomeDonor from "./Pages/BecomeDonor/BecomeDonor";
import AuthProvider from "./context/AuthContext/AuthProvider";
import Register from "./Pages/Auth/Register/Register";

const App = () => {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>, 
      children: [
        {
          path: '/', 
          element: <Home />
        },
        {
          path: '/all-donors', 
          element: <Donors />
        },
        {
          path: '/contact', 
          element: <Contact />
        },
        {
          path: '/request-blood', 
          element: <RequestBlood />
        },
        {
          path: '/eligibility', 
          element: <Eligibility />
        },
        {
          path: '/benefits', 
          element: <DonationBenefits />
        },
        {
          path: '/faq', 
          element: <FAQ />
        },
        {
          path: '/privacy-policy', 
          element: <PrivacyPolicy />
        },
        {
          path: '/register-donor', 
          element: <BecomeDonor />
        },
        {
          path: '/register', 
          element: <Register />
        },
      ]
    },
  ]);

   return ( 
    <> 
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ScrollToTop />
    </> )
}

export default App
