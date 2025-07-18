import React from "react";
import {assets} from "../assets/assets.js"
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px] ">
        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to='/add'> 
            <img src={assets.add_icon} className="w-5 h-5" alt="" />
            <p className="hidden md:block">Add items</p>
        </NavLink> 


          <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to='/list'> 
            <img src={assets.order_icon} className="w-5 h-5" alt="" />
            <p className="hidden md:block">List items</p>
        </NavLink> 


          <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to='/orders'> 
            <img src={assets.order_icon} className="w-5 h-5" alt="" />
            <p className="hidden md:block">Order</p>
        </NavLink> 
       
        
       
      </div>
    </div>
  );
};

export default Sidebar;
