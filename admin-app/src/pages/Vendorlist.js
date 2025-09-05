import React, { useState } from 'react'
import { exportToCSV } from "../utils/exportToCSV";
import { confirmDelete } from "../utils/confirmDelete";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Vendorlist = () => {
        const [searchTerm, setSearchTerm] = useState("");
        const [vendors, setVendors] = useState([
            { id: 1, name: "Karim",brand:"Bonus brand Arflex", email: "karimziadsaad@gmail.com", phone: "01120552462", registered: "May 15, 2025", products: 10, earn: "$10,950" },
            { id: 2, name: "Saad",brand:"Bonus brand Arflex", email: "saadkarimzaad@gmail.com", phone: "01120552462", registered: "May 15, 2025", products: 10, earn: "$10,950" },
            { id: 3, name: "Ziad",brand:"Bonus brand Arflex", email: "ziadkarimsaad@gmail.com", phone: "01120552462", registered: "May 15, 2025", products: 10, earn: "$10,950" },
            { id: 4, name: "Ahmed",brand:"Bonus brand Arflex", email: "ahmed@gmail.com", phone: "01234567890", registered: "June 20, 2025", products: 5, earn: "$5,300" },
            { id: 5, name: "Fatma",brand:"Bonus brand Arflex", email: "fatma@gmail.com", phone: "01345678901", registered: "July 10, 2025", products: 8, earn: "$7,200" },
            { id: 6, name: "Hassan",brand:"Bonus brand Arflex", email: "hassan@gmail.com", phone: "01456789012", registered: "August 5, 2025", products: 12, earn: "$12,500" }
      ]);
    
    
    
        const [currentPage, setCurrentPage] = useState(1);
        const [vendorsPerPage, setVendorsPerPage] = useState(5);
      
        // Filter vendors based on search input
        const filteredVendors = vendors.filter((vendor) =>
            vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          
      
        // Paginate vendors
        const indexOfLastVendor = currentPage * vendorsPerPage;
        const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
        const currentVendors = filteredVendors.slice(indexOfFirstVendor, indexOfLastVendor);
      
        // Handle delete action
        const handleDelete = (id) => {
          setVendors((prevVendors) => prevVendors.filter((vendor) => vendor.id !== id));
        };
        // const handleDelete = (index) => {
        //   setVendors(vendors.filter((_, i) => i !== index));
        // };
      
        // Toggle vendor status
        const toggleStatus = (index) => {
          setVendors((prevVendors) =>
            prevVendors.map((vendor, i) =>
              i === index
                ? { ...vendor, status: vendor.status === "Active" ? "Inactive" : "Active" }
                : vendor
            )
          );
        };
      
        // Change page
        const paginate = (pageNumber) => setCurrentPage(pageNumber);
      
        // Change vendors per page
        const handleVendorsPerPageChange = (e) => {
          setVendorsPerPage(Number(e.target.value));
          setCurrentPage(1); // Reset to first page when changing vendors per page
        };
      
      
        // const handleDeleteClick = (index) => {
        //   confirmDelete("vendor",() => handleDelete(index));
        // };


         const handleDeleteClick = async (vendor) => {
            if (!vendor || !vendor.name) {
              // console.error("Invalid vendor:", vendor);
              toast.error("Invalid vendor. Please try again!", {
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
            await confirmDelete(vendor.name, () => handleDelete(vendor.id));
          };
             

        // const handleDeleteClick = (id) => {
        //   confirmDelete("vendor", () => handleDelete(id));
        // };
    
    return (
    <>
    <Meta title="Vendors" />
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
          <h1 className="fs-4 fw-bold mb-0">Vendor List</h1>
          <div className="d-flex align-items-center" style={{ gap: "8px" }}>
            <input
              type="text"
              placeholder="Search by Vendor Name"
              className="form-control"
              style={{ border: "1px solid #ccc", borderRadius: "6px", padding: "8px" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
             {/* Export Button */}
            <button onClick={() => exportToCSV(vendors, "vendors.csv")} className="button d-flex align-items-center" style={{ cursor: "pointer", marginLeft: "25px" }}>
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
                <th style={{ padding: "12px", textAlign: "center" }}>vendor Name</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Brand Name</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Email</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Phone</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Registered</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Products</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Total Earn</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "14px", color: "#4b5563", backgroundColor: "#E9EEFD" }}>
              {currentVendors.map((vendor, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #e5e7eb",
                    backgroundColor: index % 2 === 0 ? "#F5FEFE" : "#E7F7F9",
                  }}
                >
                  <td style={{ padding: "12px", textAlign: "left" }}>{index+ 1 + indexOfFirstVendor}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                  <img
                    src="/profile-vendor.jpg"
                    alt="Profile"
                    width="50"
                    height="50"
                    className="rounded-circle"
                  />
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{vendor.name}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{vendor.brand}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{vendor.email}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{vendor.phone}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{vendor.registered}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{vendor.products}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{vendor.earn}</td>
                  {/* <td style={{ padding: "12px", textAlign: "center" }}>
                    <button
                      onClick={() => toggleStatus(index + indexOfFirstVendor)}
                      style={{
                        backgroundColor: vendor.status === "Active" ? "#08053B" : "#d1d5db",
                        color: vendor.status === "Active" ? "white" : "#374151",
                        padding: "6px 12px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        border: "none",
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                    >
                      {vendor.status}
                    </button>
                  </td> */}
                  <td className='d-flex justify-content-center align-items-center mt-2' style={{ padding: "12px", textAlign: "center" }}>
                  <Link
                    to={`vendor-detail/${vendor.id}`}
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
                        alt="vendor Detail"
                        style={{ width: "30px", height: "30px" }}
                    />
                </Link>
                
                <button
                onClick={() => handleDeleteClick(vendor)}
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
              {currentVendors.length === 0 && (
                <tr>
                  <td colSpan="10" style={{ textAlign: "center", padding: "12px", color: "#888", fontSize: "16px" }}>
                    No matching vendors found.
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
      value={vendorsPerPage}
      onChange={handleVendorsPerPageChange}
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
    <span>vendors per page</span>
  </div>
  
  <div
    className="pagination d-flex justify-content-end align-items-center mt-0 mx-2"
    style={{ marginTop: "16px", textAlign: "center", gap: "6px" }}
  >
    {[...Array(Math.ceil(filteredVendors.length / vendorsPerPage)).keys()].map(
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

export default Vendorlist;

