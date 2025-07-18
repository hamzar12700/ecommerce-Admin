import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendURL } from "../App";
import { toast } from "react-toastify";
const List = ({ token }) => {
  const [list, setList] = useState([]);
  console.log(token);

  const fetchData = async () => {
    if (!token) {
      console.error("No token provided");
      return;
    }

    try {
      const response = await axios.get(`${backendURL}/api/product/list`, {
        headers: { token },
      });

      if (response.data.success) {
        setList(response.data.product);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

const removeItem = async (id) => {
  try {
    const response = await axios.post(
      `${backendURL}/api/product/remove`,
      { id },
      {
        headers: {
          token: token,
        },
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      fetchData();
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    console.log("Error:", error.response);
  }
};



  return (
    <div>
      <p className="mb-2 font-semibold text-lg">All Products</p>

      <div className="flex flex-col gap-2">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-200 text-sm font-medium">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            key={index}
          >
            <img
              className="w-12 h-12 object-cover rounded"
              src={item.images[0]}
              alt="product"
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p
              onClick={() => removeItem(item._id)}
              className="text-right md:text-center cursor-pointer text-red-500 text-lg font-bold"
            >
              ✕
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
