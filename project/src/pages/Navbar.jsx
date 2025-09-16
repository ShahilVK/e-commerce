import React from 'react';
import { Link } from 'react-router-dom';



const sec= [
    {
        id:1,
        name: "Home",
        link: "/",
    },
    {
        id:2,
        name: "About",
        link: "/about"
    }
]
function Navbar() {
    

  return (
    <nav className="w-full bg-white shadow p-4 flex justify-between items-center">

        {/* Nav left-section */}
        <div className='flex items-center gap-4'>
      <h1 className="text-2xl font-bold text-red-500 sm:text-3xl ">ESHOP</h1>
    <div className='hidden lg:block'>
        <ul className='flex items-center gap-4'>
            {sec.map((data, index)=>(
                <li key={index}>
                    <a href= {data.link}
                    className='inline-block px-4 font-semibold text-gray-500 hover:text-black  duration-200'> {data.name} </a>
                </li>

            ))}
        </ul>
        </div>
        </div>
    
      
      <div className="space-x-6">
        {/* Search bar */}

            <input type="text"
            placeholder='Search'
            className='px-4 py-2 border rounded-full w-50 focus:outline-none focus:ring-2 focus:ring-red-300' />

         


            
        
        {/* <Link to="/" className="hover:text-red-500">
          Home
        </Link> */}
        <Link to="/login" className=" text-gray-500 hover:text-red-500">
          Login
        </Link>
        <Link to="/register" className=" text-gray-500 hover:text-red-500">
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
