import React from 'react'

const Navbar = () => {
  return (
   <nav className='flex justify-between bg-emerald-400 text-white py-2 items-center'>
    <div className="logo">
        <span className='font-bold text-xl mx-10'>v-List</span>
    </div>
    <ul className=" mx-10 ">
        <li className='cursor-pointer hover:font-semibold'>Home</li>
    </ul>
   </nav>
  )
}

export default Navbar
