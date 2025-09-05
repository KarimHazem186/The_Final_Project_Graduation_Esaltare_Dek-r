import React from "react";
import { Card, Avatar } from "antd";

const customers = [
  { name: "Karim", orders: 20, image: "https://storage.googleapis.com/a1aa/image/eboH_aPyg0xgyyJ_a7F70K_82H2RY6hf0oMWP824wWM.jpg" },
  { name: "Karim", orders: 20, image: "https://storage.googleapis.com/a1aa/image/eboH_aPyg0xgyyJ_a7F70K_82H2RY6hf0oMWP824wWM.jpg" },
  { name: "Saad", orders: 20, image: "https://storage.googleapis.com/a1aa/image/r4DjDmnjXc9_a7Qzx8e5LxtKonAOmM4nuTlTgIrvfXg.jpg" },
  { name: "Saad", orders: 20, image: "https://storage.googleapis.com/a1aa/image/r4DjDmnjXc9_a7Qzx8e5LxtKonAOmM4nuTlTgIrvfXg.jpg" },
  { name: "Ziad", orders: 20, image: "https://storage.googleapis.com/a1aa/image/c3tvui3idogbqkOFN0r6O9Eex6uY7KZLnC5R1F6bWVc.jpg" },
  { name: "Ziad", orders: 20, image: "https://storage.googleapis.com/a1aa/image/c3tvui3idogbqkOFN0r6O9Eex6uY7KZLnC5R1F6bWVc.jpg" }
];

const TopCustomers = () => {
  return (
    // <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-3 shadow bg-light vh-100 rounded-3">
        <div className="d-grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {customers.map((customer, index) => (
            <div key={index} className="text-center shadow-sm p-3 rounded" style={{backgroundColor:"#F6F5F5"}}>
              <Avatar src={customer.image} size={80} />
              <p className="fw-bold mt-1">{customer.name}</p>
              <p className="fw-semibold" style={{color:"#08053B"}}>Orders: {customer.orders}</p>
            </div>
          ))}
        </div>
      </div>
    
    // </div>
  );
};

export default TopCustomers;
