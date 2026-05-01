import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import axios from 'axios'
import { StoreContext } from '../../Context/StoreContext'
import { toast } from 'react-toastify'

const MyOrders = () => {

  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token])

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="my-orders-container">
        {data.length === 0 && <p className="no-orders">No orders yet. Start ordering some delicious food!</p>}
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <div className="order-items">
                <p>{order.items.map((item, idx) => {
                  if (idx === order.items.length - 1) {
                    return item.food_name + " x " + item.quantity
                  } else {
                    return item.food_name + " x " + item.quantity + ", "
                  }
                })}</p>
              </div>
              <p className="order-amount">₹{order.amount}</p>
              <p className="order-items-count">Items: {order.items.length}</p>
              <p className={`order-status ${order.status.replace(/\s/g, '-').toLowerCase()}`}>
                <span>&#x25cf;</span> {order.status}
              </p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders
