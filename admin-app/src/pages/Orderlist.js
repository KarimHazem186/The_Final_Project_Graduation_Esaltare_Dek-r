import React, { useState } from 'react'
import { exportToCSV } from "../utils/exportToCSV";
import { confirmDelete } from "../utils/confirmDelete";
import Meta from "../components/Meta";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Orderlist = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [orders, setOrders] = useState([
      { id: 1, number: "#3201", date: "June 26, 2025", customer: "Karim", paid: "Yes", status: "New", items: "3 items", total: "$1000",orderStatus: "Active" },
      { id: 2, number: "#3209", date: "June 26, 2025", customer: "ziad", paid: "Yes", status: "New", items: "3 items", total: "$1000",orderStatus: "Inactive" },
      { id: 3, number: "#3208", date: "June 26, 2025", customer: "ziad", paid: "Yes", status: "New", items: "3 items", total: "$1000",orderStatus: "Active" },
      { id: 4, number: "#3202", date: "June 26, 2025", customer: "saad", paid: "Yes", status: "New", items: "3 items", total: "$1000",orderStatus: "Inactive" },
      { id: 5, number: "#3203", date: "June 26, 2025", customer: "saad", paid: "No", status: "Pending", items: "3 items", total: "$1000",orderStatus: "Active" },
      { id: 6, number: "#3204", date: "June 26, 2025", customer: "Karim", paid: "No", status: "Pending", items: "3 items", total: "$1000",orderStatus: "Inactive" },
      { id: 7, number: "#3205", date: "June 26, 2025", customer: "Karim", paid: "Partial", status: "Shipped", items: "3 items", total: "$1000",orderStatus: "Active" },
      { id: 8, number: "#3206", date: "June 26, 2025", customer: "ziad", paid: "Partial", status: "New", items: "3 items", total: "$1000",orderStatus: "Active" },
      { id: 9, number: "#3207", date: "June 26, 2025", customer: "saad", paid: "Yes", status: "Shipped", items: "3 items", total: "$1000",orderStatus: "Inactive" },
      { id: 10, number: "#3301", date: "June 26, 2025", customer: "David", paid: "Yes", status: "Shipped", items: "3 items", total: "$1000",orderStatus: "Active" }
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage, setOrdersPerPage] = useState(5);
      
    // Filter orders based on search input
    const filteredOrders = orders.filter((order) =>
        order.number.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Paginate 
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Handle delete action
    const handleDelete = (id) => {
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    };
    // const handleDelete = (index) => {
    //     setOrders(orders.filter((_, i) => i !== index));
    // };  
    
    const toggleStatus = (index) => {
        setOrders((prevOrders) =>
            prevOrders.map((order, i) =>
            i === index
            ? { ...order, orderStatus: order.orderStatus === "Active" ? "Inactive" : "Active" }
            : order
        )
        );
    };


    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Change orders per page
    const handleOrdersPerPageChange = (e) => {
        setOrdersPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when changing orders per page
    };


    // const handleDeleteClick = (index) => {
    //     confirmDelete("order",() => handleDelete(index));
    // };

      const handleDeleteClick = async (order) => {
          if (!order || !order.number) {
            // console.error("Invalid order:", order);
            toast.error("Invalid order. Please try again!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
            });
            return;
          }
          await confirmDelete(order.number, () => handleDelete(order.id));
        };
              
        
    // const handleDeleteClick = (id) => {
    //     confirmDelete("order",() => handleDelete(id));
    // };
        

    
    return (
        <>
        <Meta title="Orders" />
        <div style={{ backgroundColor: "#f3f4f6", padding: "24px" }}>
                      <div
                        style={{
                          maxWidth: "1200px",
                          margin: "0 auto",
                          backgroundColor: "white",
                          padding: "24px",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h1 className="fs-4 fw-bold mb-0">Order List</h1>
                          <div className="d-flex align-items-center" style={{ gap: "8px" }}>
                            <input
                              type="text"
                              placeholder="Search by order number"
                              className="form-control"
                              style={{ border: "1px solid #ccc", borderRadius: "6px", padding: "8px" }}
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            
                             {/* Export Button */}
                            <button onClick={() => exportToCSV(orders, "orders.csv")} className="button d-flex align-items-center" style={{ cursor: "pointer", marginLeft: "15px" }}>
                                <span className="d-flex align-items-center" style={{ marginRight: "10px", fontSize: "18px" }}>📤</span>
                                <span className="d-flex align-items-center" style={{ fontSize: "18px" }}>Export</span>
                            </button>
                          </div>
                        </div>
                        <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", backgroundColor: "white", borderCollapse: "collapse" }}>
                            <thead>
                              <tr style={{ backgroundColor: "#E9EEFD", color: "#374151", textTransform: "uppercase", fontSize: "14px" }}>
                                <th style={{ padding: "12px", textAlign: "left" }}>ID</th>
                                <th style={{ padding: "12px", textAlign: "center" }}>Order Number</th>
                                <th style={{ padding: "12px", textAlign: "center" }}>Date</th>
                                <th style={{ padding: "12px", textAlign: "center" }}>Customer</th>
                                <th style={{ padding: "12px", textAlign: "center" }}>Paid</th>
                                <th style={{ padding: "12px", textAlign: "center" }}>Order Status</th>
                                <th style={{ padding: "12px", textAlign: "center" }}>Items</th>
                                <th style={{ padding: "12px", textAlign: "center" }}>Total</th>
                                <th style={{ padding: "12px", textAlign: "center" }}>Status</th>
                                <th style={{ padding: "12px", textAlign: "center" }}>Action</th>
                              </tr>
                            </thead>
                            <tbody style={{ fontSize: "14px", color: "#4b5563", backgroundColor: "#E9EEFD" }}>
                              {currentOrders.map((order, index) => (
                                <tr
                                  key={index}
                                  style={{
                                    borderBottom: "1px solid #e5e7eb",
                                    backgroundColor: index % 2 === 0 ? "#F5FEFE" : "#E7F7F9",
                                  }}
                                >
                                  <td style={{ padding: "12px", textAlign: "left" }}>{index + 1 + indexOfFirstOrder}</td>
                                  <td style={{ padding: "12px", textAlign: "center" }}>{order.number}</td>
                                  <td style={{ padding: "12px", textAlign: "center" }}>{order.date}</td>
                                  <td style={{ padding: "12px", textAlign: "center" }}>{order.customer}</td>
                                  <td style={{ padding: "12px", textAlign: "center" }}>
                                    <span className={`badge ${order.paid === "Yes" ? "bg-success" : order.paid === "Partial" ? "bg-warning" : "bg-secondary"}`}>{order.paid}</span>
                                  </td>
                                  <td style={{ padding: "12px", textAlign: "center" }}>
                                    <span className={`badge ${order.status === "New" ? "bg-danger" : order.status === "Pending" ? "bg-primary" : "bg-success"}`}>{order.status}</span>
                                  </td>
                                  <td style={{ padding: "12px", textAlign: "center" }}>{order.items}</td>
                                  <td style={{ padding: "12px", textAlign: "center" }}>{order.total}</td>
                                  <td style={{ padding: "12px", textAlign: "center" }}>
                                    <button
                                      onClick={() => toggleStatus(index + indexOfFirstOrder)}
                                      style={{
                                        backgroundColor: order.orderStatus === "Active" ? "#08053B" : "#d1d5db",
                                        color: order.orderStatus === "Active" ? "white" : "#374151",
                                        padding: "6px 12px",
                                        borderRadius: "12px",
                                        fontSize: "12px",
                                        border: "none",
                                        cursor: "pointer",
                                        marginRight: "5px",
                                      }}
                                    >
                                      {order.orderStatus}
                                    </button>
                                  </td>
                                  <td className='d-flex justify-content-center align-items-center' style={{ padding: "12px", textAlign: "center" }}>
                                  <Link
                                      to={`order-detail/${order.id}`}
                                    style={{
                                        border: "none",
                                        background: "none",
                                        cursor: "pointer",
                                        padding: "0",
                                        marginRight:"4px"
                                      }}
                                    >
                                      <img
                                        src="/order.png"
                                        alt="detail Order"
                                        style={{ width: "30px", height: "30px" }}
                                      />
                                    </Link>
                                    
                                    <button
                                    onClick={() => handleDeleteClick(order)}
                                    style={{
                                        border: "none",
                                        background: "none",
                                        cursor: "pointer",
                                        padding: "0",
                                        marginLeft:"4px"
        
                                      }}
                                    >
                                      <img
                                        src="/delete.png"
                                        alt="Delete"
                                        style={{ width: "25px", height: "25px" }}
                                      />
                                    </button>
                                    
                                  </td>
                                </tr>
                              ))}
                              {currentOrders.length === 0 && (
                                <tr>
                                  <td colSpan="7" style={{ textAlign: "center", padding: "12px", color: "#888", fontSize: "16px" }}>
                                    No matching orders found.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                        {/* Pagination */}
                <div className="d-flex justify-content-end align-items-center mt-2">
                  <div className="d-flex align-items-center" style={{ gap: "8px" }}>
                    <span>Show</span>
                    <select className="border"
                      value={ordersPerPage}
                      onChange={handleOrdersPerPageChange}
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        padding: "8px",
                      }}
                    >
                      {[1, 2, 3, 4, 5].map((number) => (
                        <option key={number} value={number}>
                          {number}
                        </option>
                      ))}
                    </select>
                    <span>reviews per page</span>
                  </div>
                  
                  <div
                    className="pagination d-flex justify-content-end align-items-center mt-0 mx-2"
                    style={{ marginTop: "16px", textAlign: "center", gap: "6px" }}
                  >
                    {[...Array(Math.ceil(filteredOrders.length / ordersPerPage)).keys()].map(
                      (number) => (
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
                      )
                    )}
                  </div>
                </div>
                
                      </div>
                    </div>
        
        </>
    );

} ;

export default Orderlist;
