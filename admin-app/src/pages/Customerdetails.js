import React, { useState } from "react";
import { Divider } from "antd";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";

const Customerdetails = () => {
    const[orders,setOrders]=useState([
    { id: 320, date: "June 26, 2025", status: "Completed", items: 4, total: "$1000" },
    { id: 321, date: "June 24, 2025", status: "Pending", items: 2, total: "$450" },
    { id: 322, date: "June 20, 2025", status: "Completed", items: 5, total: "$1300" },
    { id: 323, date: "June 18, 2025", status: "Shipped", items: 3, total: "$600" },
    { id: 324, date: "June 15, 2025", status: "Cancelled", items: 1, total: "$200" },
    { id: 325, date: "June 10, 2025", status: "Completed", items: 7, total: "$2100" },
    { id: 326, date: "June 5, 2025", status: "Processing", items: 6, total: "$1750" }
    ]);
    
    const [ordersPerPage, setOrdersPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const totalOrders = orders.length;
    const totalPages = Math.ceil(totalOrders / ordersPerPage);
  
    const handleOrdersPerPageChange = (e) => {
      setOrdersPerPage(Number(e.target.value));
      setCurrentPage(1);
    };
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    // Get current orders
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
    return (
   <>  
   <Meta title="Customer Details" />
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <h1 className="h4 mb-4">Customer Details</h1>
        <div className="row">
          <div className="col-lg-3 mb-4">
            <div className="card shadow-sm p-3 text-center d-flex align-items-center justify-content-center h-100">
              <img 
                src="https://clipground.com/images/clipart-chairman-15.jpg"
                alt="Profile of Customer"
                className="rounded-circle mb-3 "
                width="150"
                height="150"
              />
              <h2 className="h4">Karim Hazem</h2>
              <a href="mailto:karimziadsaad@gmail.com" className="d-block mb-2" style={{color:"#17619D"}}>
                karimziadsaad@gmail.com
              </a>
              <p className="text-muted">(+02) 01120552462</p>
              <Divider className="bold-divider" />

              <div className="text-semibold text-start" style={{marginLeft:"-20px",fontSize:"14px"}}>
                <p>
                  <strong>Last Order:</strong> 7 days ago - <Link to="#" style={{"color":"#17619D"}}>#80294</Link>
                </p>
                <p>
                  <strong>Average Order Value:</strong> $200.01
                </p>
                <p>
                  <strong>Registered:</strong> 2 months ago
                </p>
                <p>
                  <strong>Email Market:</strong> Subscribed
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-9 v-100" style={{marginTop:"-15px"}}>
          <div className="p-3 mb-3 w-100 position-relative">
              <textarea
                className="form-control mb-4 bg-white custom-textarea"
                rows="3"
                placeholder="Notes about customer"
                style={{ paddingRight: "40px" }}
              ></textarea>
              <img
                src="/wirte.png"
                alt="write note"
                className="position-absolute text-secondary"
                style={{
                  width: "25px",
                  height: "25px",
                  bottom: "50px",
                  right: "25px",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              />
            </div>
            <div className="card shadow-sm p-3" style={{marginTop:"-25px"}}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h6">Orders</h2>
                <p className="text-semibold">Total spent $10950 on 7 orders</p>
              </div>
              <div className="table-responsive">
              <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Items</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders.map((order, index) => (
                      <tr key={order.id} className={index % 2 === 0 ? "table-light" : ""}>
                        <td>#{order.id}</td>
                        <td>{order.date}</td>
                        <td>{order.status}</td>
                        <td>{order.items} items</td>
                        <td>{order.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
                {/* Pagination */}
              <div className="d-flex justify-content-end align-items-center mt-2">
                <div className="d-flex align-items-center" style={{ gap: "8px" }}>
                  <span>Show</span>
                  <select
                    className="border"
                    value={ordersPerPage}
                    onChange={handleOrdersPerPageChange}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      padding: "8px",
                    }}
                  >
                    {[5, 10, 15, 20].map((number) => (
                      <option key={number} value={number}>
                        {number}
                      </option>
                    ))}
                  </select>
                  <span>Orders per page</span>
                </div>
                <div className="pagination d-flex justify-content-end align-items-center mt-0 mx-2" style={{ gap: "6px" }}>
                  {[...Array(totalPages).keys()].map((number) => (
                    <button
                      key={number + 1}
                      onClick={() => paginate(number + 1)}
                      style={{
                        margin: "0 4px",
                        padding: "4px 10px",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        backgroundColor: currentPage === number + 1 ? "#08053B" : "white",
                        color: currentPage === number + 1 ? "white" : "#374151",
                        cursor: "pointer",
                      }}
                    >
                      {number + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card shadow-sm p-3 mt-3">
          <h2 className="h6 mb-2">Address</h2>
          <p>
            <strong>Karim Hazem</strong>
            <br />
            in the address “789 Pine Avenue,” “789 Pine Avenue” would go in Address Line 1
          </p>
        </div>
      </div>
    </div>
    </> 
  );
};

export default Customerdetails;
