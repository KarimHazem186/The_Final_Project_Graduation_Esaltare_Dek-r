import React, { useEffect, useState } from 'react'
import { exportToCSV } from "../utils/exportToCSV";
import { confirmDelete } from "../utils/confirmDelete";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Modal from '../components/ProductModel';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import brandService from '../features/brand/brandService';
import {  image_url } from '../utils/base_url';

const Brandlist = () => {

  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await brandService.getAllBrands();
        setBrands(data);
      } catch (err) {
        setError(err.message || 'Error fetching brands');
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);


  

  console.log(brands)

  const [searchTerm, setSearchTerm] = useState("");
            
      
    
        const [currentPage, setCurrentPage] = useState(1);
        const [categoriesPerPage, setBrandsPerPage] = useState(5);
    
        // Filter brands based on search input
  
        const filteredBrands = brands.filter((brand) =>
          brand.brandName.toLowerCase().includes(searchTerm.toLowerCase())
      );
          
    
    
        // Paginate brands
        const indexOfLastBrand = currentPage * categoriesPerPage;
        const indexOfFirstBrand = indexOfLastBrand - categoriesPerPage;
        const currentBrands = filteredBrands.slice(indexOfFirstBrand, indexOfLastBrand);
    
        // Handle delete action


        
        
        // Toggle product status
        const toggleStatus = (index) => {
          setBrands((prevBrands) =>
              prevBrands.map((brand, i) =>
            i === index
                ? { ...brand, status: brand.status === "Active" ? "Inactive" : "Active" }
                : brand
            )
        );
        };
    
        ;
    
        // Change page
        const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
        // Change products per page
        const handleBrandsPerPageChange = (e) => {
        setBrandsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when changing brands per page
        };
    

        const handleDelete = async (id) => {
          try {
            const data = await brandService.deleteBrand(id);
            
            setBrands((prevBrand) => prevBrand.filter((brand) => brand._id !== id));
        
            console.log("Brand deleted:", data);
            // toast.success('Brand deleted successfully!')
          } catch (err) {
            setError(err.message || 'Error deleting brand');
            toast.error('Error deleting brand')
          } finally {
            setLoading(false);
          }
        };
        
   
    
         const handleDeleteClick = async (brand) => {
                  if (!brand || !brand.brandName) {
                    // console.error("Invalid brand Name:", brand);
                    toast.error("Invalid brand Name. Please try again!", {
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
                  await confirmDelete(brand.brandName, () => handleDelete(brand._id));
                };
             
    
      const [showModal, setShowModal] = useState(false);
      const [selectedDescription, setSelectedDescription] = useState("");
    

      const handleOpenModal = (desc) => {
        const plainText = desc.replace(/<[^>]+>/g, '');   
        setSelectedDescription(plainText);
        setShowModal(true);
      };

      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error}</p>;
    
  
    return (
    <>
        <Meta title="Brands" />

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
                  <h1 className="fs-4 fw-bold mb-0">Brands List</h1>
                  <div className="d-flex align-items-center" style={{ gap: "8px" }}>
                    <input
                      type="text"
                      placeholder="Search by brand Name"
                      className="form-control"
                      style={{ border: "1px solid #ccc", borderRadius: "6px", padding: "8px" }}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Link to='new-brand' className="button" style={{ cursor: "pointer", marginLeft: "25px" }}>
                        <span className="" style={{marginRight:"5px",fontSize: "15px" }}>New</span>
                        <span className="" style={{ fontSize: "15px" }}>Brand</span>
                    </Link>
                     {/* Export Button */}
                    <button onClick={() => exportToCSV(brands, "brands.csv")} className="button d-flex align-items-center" style={{ cursor: "pointer", marginLeft: "25px" }}>
                        <span className="d-flex align-items-center" style={{ marginRight: "10px", fontSize: "18px" }}>📤</span>
                        <span className="d-flex align-items-center" style={{ fontSize: "18px" }}>Export</span>
                    </button>
                  </div>
                </div>
                <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", backgroundColor: "white", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ backgroundColor: "#E9EEFD", color: "#374151", textTransform: "uppercase", fontSize: "14px" }}>
                        <th style={{ padding: "12px", textAlign: "center" }}>ID</th>
                        <th style={{ padding: "12px", textAlign: "center" }}>Image</th>
                        <th style={{ padding: "12px", textAlign: "center" }}>Brand Name</th>
                        <th style={{ padding: "12px", textAlign: "center" }}>Brand Description</th>
                        <th style={{ padding: "12px", textAlign: "center" }}>Priority</th>
                        <th style={{ padding: "12px", textAlign: "center" }}>Registered</th>
                        <th style={{ padding: "12px", textAlign: "center" }}>Status</th>
                        <th style={{ padding: "12px", textAlign: "center" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody style={{ fontSize: "14px", color: "#4b5563", backgroundColor: "#E9EEFD" }}>
                      {currentBrands.map((brand, index) => (
                        <tr
                          key={brand._id}
                          style={{
                            borderBottom: "1px solid #e5e7eb",
                            backgroundColor: index % 2 === 0 ? "#F5FEFE" : "#E7F7F9",
                          }}
                        >
                          <td style={{ padding: "12px", textAlign: "center" }}>{index+ 1 + indexOfFirstBrand}</td>
                          <td style={{ padding: "12px", textAlign: "center" }}>
                          <img
                            src={`${image_url}${brand.images[0]?.url}`}
                            alt="BrandImage"
                            width="90"
                            height="55"
                          />
                          </td>
                          <td style={{ padding: "12px", textAlign: "center" }}>{brand.brandName}</td>
                          
                        {/* Truncated Description with Read More */}
                        
                            <td style={{ padding: "12px", textAlign: "center" }} >
                              {brand.description.length > 40
                                ? `${brand.description.substring(0, 40).replace(/<[^>]+>/g, '')}...`
                                : brand.description.replace(/<[^>]+>/g, '')}
                                <br />

                              {brand.description.length > 40 && (
                                <button
                                  onClick={() => handleOpenModal(brand.description)}
                                  style={{
                                    marginLeft: "8px",
                                    padding: "4px 6px",
                                    backgroundColor: "#05284e",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer",
                                    borderRadius: "8px",
                                    fontSize: "10px",
                                  }}
                                >
                                  Read More
                                </button>
                              )}
                            </td>


                          

                         
                          <td style={{ padding: "12px", textAlign: "center" }}>{brand.priority}</td>
                          {/* <td style={{ padding: "12px", textAlign: "center" }}>{new Date(brand.createdAt).toLocaleString()}</td> */}
                          <td style={{ padding: "12px", textAlign: "center" }}>
                            {new Date(brand.createdAt).toLocaleString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </td>
                          
                          <td style={{ padding: "12px", textAlign: "center" }}>
                            <button
                              onClick={() => toggleStatus(index + indexOfFirstBrand)}
                              style={{
                                backgroundColor: brand.status === "Active" ? "#08053B" : "#d1d5db",
                                color: brand.status === "Active" ? "white" : "#374151",
                                padding: "6px 12px",
                                borderRadius: "12px",
                                fontSize: "12px",
                                border: "none",
                                cursor: "pointer",
                                marginRight: "5px",
                              }}
                            >
                              {brand.status}
                            </button>
                          </td>
                          <td className='d-flex justify-content-center align-items-center mt-2' style={{ padding: "16px", textAlign: "center" }}>
                          <Link
                            to={`edit-brand/${brand._id}`}
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
                                alt="Edit brand"
                                style={{ width: "30px", height: "30px" }}
                            />
                        </Link>
                        
                        <button
                        onClick={() => handleDeleteClick(brand)}
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
                      {currentBrands.length === 0 && (
                        <tr>
                          <td colSpan="15" style={{ textAlign: "center", padding: "12px", color: "#888", fontSize: "16px" }}>
                            No matching brand found.
                          </td>
                        </tr>
                      )}
        
                       {/* Modal Popup */}
                        {showModal && (
                            <Modal description={selectedDescription} onClose={() => setShowModal(false)} />
                        )}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                    <div className="d-flex justify-content-end align-items-center mt-2">
                    <div className="d-flex align-items-center" style={{ gap: "8px" }}>
                        <span>Show</span>
                        <select className="border"
                        value={categoriesPerPage}
                        onChange={handleBrandsPerPageChange}
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
                        <span>brands per page</span>
                    </div>
                    
                    <div
                        className="pagination d-flex justify-content-end align-items-center mt-0 mx-2"
                        style={{ marginTop: "16px", textAlign: "center", gap: "6px" }}
                    >
                        {[...Array(Math.ceil(filteredBrands.length / categoriesPerPage)).keys()].map(
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

export default Brandlist