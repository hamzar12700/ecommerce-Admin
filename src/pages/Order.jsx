import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendURL } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      console.log("no token found");
      return null;
    }

    try {
      const res = await axios.post(
        backendURL + "/api/order/list",
        {},
        { headers: { token } } // ✅ Corrected here
      );
      // console.log(res.data.orders);
      setOrders(res.data.orders); // optional
      // console.log(orders);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  // console.log(orders);

  const statusHandler = async (status, orderId) => {
    let res = await axios.post(
      backendURL + "/api/order/status",
      { orderId, status },
      { headers: { token } }
    );
    try {
      if (res.data.success) {
        await fetchAllOrders();
      } else {
        console.log(error.message);
        toast.error(error.message);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            >
              <img className="w-12 " src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  {order.item.map((item, index) => {
                    if (index === order.item.length - 1) {
                      return (
                        <p className="py-0.5" key={index}>
                          {" "}
                          {item.name} x {item.quantity} <span>{item.size}</span>
                        </p>
                      );
                    } else {
                      return (
                        <p className="py-0.5" key={index}>
                          {" "}
                          {item.name} x {item.quantity} <span>{item.size}</span>
                          ,
                        </p>
                      );
                    }
                  })}
                </div>
                <p className="mt-3 mb-2 font-medium">
                  `{order.address.firstName} {order.address.lastName}`{" "}
                </p>
                <div>
                  <p>{order.address.street},</p>
                  <p>
                    {order.address.city +
                      " , " +
                      order.address.state +
                      " " +
                      order.address.country +
                      "  " +
                      order.address.zipCode}{" "}
                  </p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className="text-sm sm:text-[15px]">
                  Items : {order.item.length}
                </p>
                <p className="mt-3">Method : {order.paymentMethod}</p>
                <p>Payment : {order.payment ? "Done" : "Pending"}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className="text-sm sm:text-[15px]"> $ {order.amount}</p>
              <select
              onChange={(event)=> statusHandler( event.target.value , order._id )}
                value={order.status}
                name=""
                id=""
                className="p-2 font-semibold"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipping">Shipping</option>
                <option value="Out For Delevery">Out For Delevery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
