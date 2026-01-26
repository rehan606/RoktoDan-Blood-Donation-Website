import React from "react";
import { createBrowserRouter,  } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from "./Layouts/MainLayout";
import Home from "./Pages/Home/Home";
import Contact from "./Pages/Contact/Contact";

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
          path: '/contact', 
          element: <Contact />
        },
      ]
    },
  ]);

   return <RouterProvider router={router} />
}

export default App
