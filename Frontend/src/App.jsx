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
      ]
    },
  ]);

   return ( 
    <> 
      <RouterProvider router={router} />
      <ScrollToTop />
    </> )
}

export default App
