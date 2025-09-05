import React, { useEffect } from 'react'
import { Card, Avatar } from "antd";

const DeliveryMan = () => {
    const customers = [
        { name: "Smith", orders: 20, image: "delivery-man.png" },
        { name: "Smith", orders: 20, image: "delivery-man.png" },
        { name: "Smith", orders: 20, image: "delivery-man.png" },
        { name: "Smith", orders: 20, image: "delivery-man.png" },
        { name: "Smith", orders: 20, image: "delivery-man.png" },
        { name: "Smith", orders: 20, image: "delivery-man.png" },
    ];

  // const [customers, setCustomers] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("https://api.com/customers");
  //       const result = await response.json();
  //       setCustomers(result);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  
    return (
    <>
    <div className="p-3 shadow bg-light vh-100 rounded-3">
            <div className="d-grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
              {customers.map((customer, index) => (
                <div key={index} className="text-center shadow-sm p-3 rounded" style={{backgroundColor:"#F6F5F5"}}>
                  {/* <Avatar src={customer.image} size={100} /> */}
                  <img src={customer.image} alt='Delivery Man' width={80} height={80} />
                  <p className="fw-bold mt-1">{customer.name}</p>
                  <p className="fw-semibold" style={{color:"#08053B"}}>Order delivered: {customer.orders}</p>
                </div>
              ))}
            </div>
    </div>
        
    </>
  )
}

export default DeliveryMan