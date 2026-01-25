import React from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from "./Layouts/MainLayout";
import Home from "./Pages/Home";

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
      ]
    },
  ]);

   return <RouterProvider router={router} />
}

export default App
