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
import Login from "./Pages/Auth/Login/Login";
import DashboardLayout from "./Layouts/DashboardLayout";
import PrivateRoute from "./Routes/PrivateRoute";
import PendingDonors from "./Pages/Dashboard/Donors/PendingDonors";
import ActiveDonors from "./Pages/Dashboard/Donors/ActiveDonors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MakeAdmin from "./Pages/Dashboard/Admin/MakeAdmin/MakeAdmin";
import Forbidden from "./Pages/Dashboard/ForbiddenPage/Forbidden";
import AdminRoute from "./Routes/AdminRoute";

// Create a client
const queryClient = new QueryClient()

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
          element: <PrivateRoute> <Contact /> </PrivateRoute> 
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
          element: <PrivateRoute> <BecomeDonor /> </PrivateRoute>,
        },
        {
          path: '/register', 
          element: <Register />
        },
        {
          path: '/login', 
          element: <Login />
        },
        {
          path: '/forbidden', 
          element: <Forbidden />
        },
      ]
    },
    {
    path: "/dashboard",
      element: <PrivateRoute> <DashboardLayout /> </PrivateRoute>, 
      children:[
        {
          path: '/dashboard/active-donors', 
          element: <AdminRoute> <ActiveDonors /> </AdminRoute> 
        },
        {
          path: '/dashboard/pending-donors', 
          element: <AdminRoute>  <PendingDonors /> </AdminRoute>
        },
        {
          path: '/dashboard/make-admin', 
          element: <AdminRoute> <MakeAdmin /> </AdminRoute>
        },
      ]
    },
  ]);

   return ( 
    <> 
     <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
        <ScrollToTop />
      </QueryClientProvider>
    </> )
}

export default App
