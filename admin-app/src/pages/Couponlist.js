import React, { useEffect, useState } from 'react'
import { exportToCSV } from "../utils/exportToCSV";
import { confirmDelete } from "../utils/confirmDelete";
import Meta from "../components/Meta";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import couponService from '../features/coupon/couponService';
const Couponlist = () => {
  const [searchTerm, setSearchTerm] = useState("");
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [couponsPerPage, setCouponsPerPage] = useState(5);



     useEffect(() => {
        const fetchCoupons = async () => {
          try {
            const data = await couponService.getAllCoupons();
            setCoupons(data);
          } catch (err) {
            setError(err.message || 'Error fetching coupons');
          } finally {
            setLoading(false);
          }
        };
    
        fetchCoupons();
      }, []);
    
      console.log(coupons)

    // Filter coupons based on search input
    const filteredCoupons = coupons.filter((coupon) =>
        coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Paginate 
    const indexOfLastCoupon = currentPage * couponsPerPage;
    const indexOfFirstCoupon = indexOfLastCoupon - couponsPerPage;
    const currentCoupons = filteredCoupons.slice(indexOfFirstCoupon, indexOfLastCoupon);

    // Handle delete action
    const handleDelete = async (id) => {
      try {
        const data = await couponService.deleteCoupon(id);
        
        setCoupons((prevCoupons) => prevCoupons.filter((coupon) => coupon._id !== id));
    
        console.log("Coupon deleted:", data);
        // toast.success('Coupon deleted successfully!')
      } catch (err) {
        setError(err.message || 'Error deleting coupon');
        toast.error('Error deleting coupon')
      } finally {
        setLoading(false);
      }
    };
    

    // const handleDelete = (index) => {
    // setCoupons(coupons.filter((_, i) => i !== index));
    // };

    // Toggle review status
    const toggleStatus = (index) => {
        setCoupons((prevCoupons) =>
            prevCoupons.map((coupon, i) =>
            i === index
            ? { ...coupon, status: coupon.status === "Active" ? "Inactive" : "Active" }
            : coupon
        )
        );
    };

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Change coupons per page
    const handleCouponsPerPageChange = (e) => {
        setCouponsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when changing coupons per page
    };


    // const handleDeleteClick = (coupon,id) => {
    //     confirmDelete(coupon.code,() => handleDelete(id));
    // };

    const handleDeleteClick = async (coupon) => {
      if (!coupon || !coupon.code) {
        // console.error("Invalid coupon:", coupon);
        toast.error("Invalid coupon. Please try again!", {
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
      await confirmDelete(coupon.code, () => handleDelete(coupon._id));
    };


    // const handleDeleteClick = (index) => {
    //     confirmDelete("coupon",() => handleDelete(index));
    // };
      
    return (
    <>      
        <Meta title="Coupons" />
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
                  <h1 className="fs-4 fw-bold mb-0">Coupon List</h1>
                  <div className="d-flex align-items-center" style={{ gap: "8px" }}>
                    <input
                      type="text"
                      placeholder="Search by Coupon Code"
                      className="form-control"
                      style={{ border: "1px solid #ccc", borderRadius: "6px", padding: "8px" }}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Link to='new-coupon' className="button" style={{ cursor: "pointer", marginLeft: "25px" }}>
                    <span className="" style={{marginRight:"5px",fontSize: "15px" }}>New</span>
                    <span className="" style={{ fontSize: "15px" }}>Coupon</span>
                    </Link>
                     {/* Export Button */}
                    <button onClick={() => exportToCSV(coupons, "coupons.csv")} className="button d-flex align-items-center" style={{ cursor: "pointer", marginLeft: "15px" }}>
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
                        <th style={{ padding: "12px", textAlign: "center" }}>Coupon Code</th>
                        <th style={{ padding: "12px", textAlign: "center" }}>Type</th>
                        <th style={{ padding: "12px", textAlign: "center" }}>usage Limit</th>
                        <th style={{ padding: "12px", textAlign: "center" }}>Discount</th>
                        <th style={{ padding: "12px", textAlign: "center" }}>Priority</th>
                        <th style={{ padding: "12px", textAlign: "center" }}>Start Date</th>
                        <th style={{ padding: "12px", textAlign: "center" }}>End Date</th>
                        <th style={{ padding: "12px", textAlign: "center" }}>Coupon Status</th>
                        <th style={{ padding: "12px", textAlign: "center" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody style={{ fontSize: "14px", color: "#4b5563", backgroundColor: "#E9EEFD" }}>
                      {currentCoupons.map((coupon, index) => (
                        <tr
                          key={coupon._id}
                          style={{
                            borderBottom: "1px solid #e5e7eb",
                            backgroundColor: index % 2 === 0 ? "#F5FEFE" : "#E7F7F9",
                          }}
                        >
                          <td style={{ padding: "12px", textAlign: "left" }}>{index + 1 + indexOfFirstCoupon}</td>
                          <td style={{ padding: "12px", textAlign: "center" }}>{coupon.code}</td>
                          <td style={{ padding: "12px", textAlign: "center" }}>{coupon.type }</td>
                          <td style={{ padding: "12px", textAlign: "center" }}>{coupon.usageLimit}</td>
                          <td style={{ padding: "12px", textAlign: "center" }}>
                            {coupon.type === 'percentage' && coupon.discountValue
                              ? `${coupon.discountValue}%`
                              : coupon.type === 'fixed' && coupon.discountValue
                              ? `${coupon.discountValue}`
                              : '-----'}
                          </td>
                          <td style={{ padding: "12px", textAlign: "center" }}>{coupon.priority}</td>
                          <td style={{ padding: "12px", textAlign: "center" }}>
                            {new Date(coupon.startDate).toLocaleString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </td>
                          <td style={{ padding: "12px", textAlign: "center" }}>
                          {new Date(coupon.endDate).toLocaleString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </td>
                          <td style={{ padding: "12px", textAlign: "center" }}>
                            <button
                              onClick={() => toggleStatus(index + indexOfFirstCoupon)}
                              style={{
                                backgroundColor: coupon.status === "Active" ? "#08053B" : "#d1d5db",
                                color: coupon.status === "Active" ? "white" : "#374151",
                                padding: "6px 12px",
                                borderRadius: "12px",
                                fontSize: "12px",
                                border: "none",
                                cursor: "pointer",
                                marginRight: "5px",
                              }}
                            >
                              {coupon.status}
                            </button>
                          </td>
                          <td className='d-flex justify-content-center align-items-center' style={{ padding: "12px", textAlign: "center" }}>
                          <Link
                              to={`edit-coupon/${coupon._id}`}
                            style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                padding: "0",
                                marginRight:"4px"
                              }}
                            >
                              <img
                                src="/edit (2).png"
                                alt="Edit Coupon"
                                style={{ width: "25px", height: "25px" }}
                              />
                            </Link>
                            
                            <button
                            onClick={() => handleDeleteClick(coupon)}
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
                      {currentCoupons.length === 0 && (
                        <tr>
                          <td colSpan="7" style={{ textAlign: "center", padding: "12px", color: "#888", fontSize: "16px" }}>
                            No matching coupons found.
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
              value={couponsPerPage}
              onChange={handleCouponsPerPageChange}
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
            {[...Array(Math.ceil(filteredCoupons.length / couponsPerPage)).keys()].map(
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
  )
}

export default Couponlist