import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-base-500 shadow-sm" data-theme="dark">
        <div className="flex-1">
          <a className="text-xl"><Link to='/' className="no-underline">E-comm</Link></a>
        </div>
        <div className="flex-none px-4">          
          <button className="btn btn-outline btn-info" ><Link className="no-underline" to="/addproduct">Add Product</Link></button>  
          
        </div>
      </div>
    </>
  );
};

export default Navbar;
