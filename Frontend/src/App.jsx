import React from "react";
import { createBrowserRouter,  } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from "./Layouts/MainLayout";
import Home from "./Pages/Home/Home";
import Contact from "./Pages/Contact/Contact";
import RequestBlood from "./Pages/RequestBlood/RequestBlood";
import Donors from "./Pages/Donors/Donors";

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
      ]
    },
  ]);

   return <RouterProvider router={router} />
}

export default App
