import React, { useState } from 'react'
import { exportToCSV } from "../utils/exportToCSV";
import { confirmDelete } from "../utils/confirmDelete";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Customerlist = () => {
        const [searchTerm, setSearchTerm] = useState("");
        const [customers, setCustomers] = useState([
            { id: 1, name: "Karim", email: "karimziadsaad@gmail.com", phone: "01120552462", registered: "May 15, 2025", orders: 10, spent: "$10,950" },
            { id: 2, name: "Saad", email: "saadkarimzaad@gmail.com", phone: "01120552462", registered: "May 15, 2025", orders: 10, spent: "$10,950" },
            { id: 3, name: "Ziad", email: "ziadkarimsaad@gmail.com", phone: "01120552462", registered: "May 15, 2025", orders: 10, spent: "$10,950" },
            { id: 4, name: "Ahmed", email: "ahmed@gmail.com", phone: "01234567890", registered: "June 20, 2025", orders: 5, spent: "$5,300" },
            { id: 5, name: "Fatma", email: "fatma@gmail.com", phone: "01345678901", registered: "July 10, 2025", orders: 8, spent: "$7,200" },
            { id: 6, name: "Hassan", email: "hassan@gmail.com", phone: "01456789012", registered: "August 5, 2025", orders: 12, spent: "$12,500" }
      ]);
    
    
    
        const [currentPage, setCurrentPage] = useState(1);
        const [customersPerPage, setCustomersPerPage] = useState(5);
      
        // Filter customers based on search input
        const filteredCustomers = customers.filter((customer) =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          
      
        // Paginate customers
        const indexOfLastCustomer = currentPage * customersPerPage;
        const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
        const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
      
        // Handle delete action
        const handleDelete = (id) => {
          setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.id !== id));
        };
        // const handleDelete = (index) => {
        //   setCustomers(customers.filter((_, i) => i !== index));
        // };
      
        // Toggle customer status
        const toggleStatus = (index) => {
          setCustomers((prevCustomers) =>
            prevCustomers.map((customer, i) =>
              i === index
                ? { ...customer, status: customer.status === "Active" ? "Inactive" : "Active" }
                : customer
            )
          );
        };
      
        // Change page
        const paginate = (pageNumber) => setCurrentPage(pageNumber);
      
        // Change customers per page
        const handleCustomersPerPageChange = (e) => {
          setCustomersPerPage(Number(e.target.value));
          setCurrentPage(1); // Reset to first page when changing customers per page
        };
      
      
        // const handleDeleteClick = (id) => {
        //   confirmDelete("customer",() => handleDelete(id));
        // };

      const handleDeleteClick = async (customer) => {
        if (!customer || !customer.name) {
          // console.error("Invalid customer:", customer);
          toast.error("Invalid customer. Please try again!", {
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
        await confirmDelete(customer.name, () => handleDelete(customer.id));
      };
      
    
        // const handleDeleteClick = (index) => {
        //   confirmDelete("customer",() => handleDelete(index));
        // };
    
    return (
    <>
    <Meta title="Customers" />
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
          <h1 className="fs-4 fw-bold mb-0">Customer List</h1>
          <div className="d-flex align-items-center" style={{ gap: "8px" }}>
            <input
              type="text"
              placeholder="Search by Customer Name"
              className="form-control"
              style={{ border: "1px solid #ccc", borderRadius: "6px", padding: "8px" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
             {/* Export Button */}
            <button onClick={() => exportToCSV(customers, "customers.csv")} className="button d-flex align-items-center" style={{ cursor: "pointer", marginLeft: "25px" }}>
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
                <th style={{ padding: "12px", textAlign: "center" }}>Profile</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Customer Name</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Email</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Phone</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Registered</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Orders</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Total Spent</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "14px", color: "#4b5563", backgroundColor: "#E9EEFD" }}>
              {currentCustomers.map((customer, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #e5e7eb",
                    backgroundColor: index % 2 === 0 ? "#F5FEFE" : "#E7F7F9",
                  }}
                >
                  <td style={{ padding: "12px", textAlign: "left" }}>{index + 1 + indexOfFirstCustomer}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                  <img
                    src="/profile-customer.png"
                    alt="Profile"
                    width="50"
                    height="50"
                    className="rounded-circle"
                  />
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{customer.name}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{customer.email}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{customer.phone}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{customer.registered}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{customer.orders}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{customer.spent}</td>
                  {/* <td style={{ padding: "12px", textAlign: "center" }}>
                    <button
                      onClick={() => toggleStatus(index + indexOfFirstCustomer)}
                      style={{
                        backgroundColor: customer.status === "Active" ? "#08053B" : "#d1d5db",
                        color: customer.status === "Active" ? "white" : "#374151",
                        padding: "6px 12px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        border: "none",
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                    >
                      {customer.status}
                    </button>
                  </td> */}
                  <td className='d-flex justify-content-center align-items-center' style={{ padding: "12px", textAlign: "center" }}>
                  <Link
                    to={`customer-detail/${customer.id}`}
                    style={{
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        padding: "0",
                        marginRight:"4px"
                        }}
                    >
                    <img
                        src="/resume.png"
                        alt="Customer Detail"
                        style={{ width: "30px", height: "30px" }}
                    />
                </Link>
                
                <button
                onClick={() => handleDeleteClick(customer)}
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
              {currentCustomers.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "12px", color: "#888", fontSize: "16px" }}>
                    No matching customers found.
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
      value={customersPerPage}
      onChange={handleCustomersPerPageChange}
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
    <span>customers per page</span>
  </div>
  
  <div
    className="pagination d-flex justify-content-end align-items-center mt-0 mx-2"
    style={{ marginTop: "16px", textAlign: "center", gap: "6px" }}
  >
    {[...Array(Math.ceil(filteredCustomers.length / customersPerPage)).keys()].map(
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
};

export default Customerlist;

