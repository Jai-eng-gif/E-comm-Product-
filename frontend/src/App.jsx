
import "./App.css";
import AddProduct from "./components/AddProduct";

import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";





function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <ProductCard  />
        </>
      ),
    },
    {
      path: "/addproduct",
      element: (
        <>
          <Navbar />
          <AddProduct  />
        </>
      ),
    },
     
  ]);

  

  return (
    <RouterProvider router={router} />
  );
}

export default App;
