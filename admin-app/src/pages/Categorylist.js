import React, { useState,useEffect } from 'react'
import { exportToCSV } from "../utils/exportToCSV";
import { confirmDelete } from "../utils/confirmDelete";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Modal from '../components/ProductModel';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {  image_url } from '../utils/base_url';
import categoryService from '../features/category/categoryService';

const Categorylist = () => {
        const [searchTerm, setSearchTerm] = useState("");
        const [categories, setCategories] = useState([]);
            
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);



        useEffect(() => {
          const fetchCategories = async () => {
            try {
              const data = await categoryService.getAllCategories();
              setCategories(data);
            } catch (err) {
              setError(err.message || 'Error fetching categories');
            } finally {
              setLoading(false);
            }
          };
        
          fetchCategories();
        }, []);
        
    
        console.log(categories)

    
        const [currentPage, setCurrentPage] = useState(1);
        const [categoriesPerPage, setCategoriesPerPage] = useState(5);
    
        // Filter categories based on search input
  
        const filteredCategories = categories.filter((category) =>
          category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
      );
          
    
    
        // Paginate categories
        const indexOfLastCategory = currentPage * categoriesPerPage;
        const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
        const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);
    
        
        // Toggle product status
        const toggleStatus = (index) => {
          setCategories((prevCategories) =>
              prevCategories.map((category, i) =>
            i === index
                ? { ...category, status: category.status === "Active" ? "Inactive" : "Active" }
                : category
            )
        );
        };
    
        ;
    
        // Change page
        const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
        // Change products per page
        const handleCategoriesPerPageChange = (e) => {
        setCategoriesPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when changing categories per page
        };
    
        // Handle delete action

        const handleDelete = async (id) => {
          try {
            const data = await categoryService.deleteCategory(id);
            
            setCategories((prevCategory) => prevCategory.filter((category) => category._id !== id));
        
            console.log("Category deleted:", data);
            // toast.success('Category deleted successfully!')
          } catch (err) {
            setError(err.message || 'Error deleting category');
            toast.error('Error deleting category')
          } finally {
            setLoading(false);
          }
        };
       
   
    
         const handleDeleteClick = async (category) => {
                  if (!category || !category.categoryName) {
                    // console.error("Invalid Category Name:", category);
                    toast.error("Invalid Category Name. Please try again!", {
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
                  await confirmDelete(category.categoryName, () => handleDelete(category._id));
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
        <Meta title="Categories" />
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
                  <h1 className="fs-4 fw-bold mb-0">Categories List</h1>
                  <div className="d-flex align-items-center" style={{ gap: "8px" }}>
                    <input
                      type="text"
                      placeholder="Search by Category Name"
                      className="form-control"
                      style={{ border: "1px solid #ccc", borderRadius: "6px", padding: "8px" }}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Link to='new-category' className="button" style={{ cursor: "pointer", marginLeft: "25px" }}>
                        <span className="" style={{marginRight:"5px",fontSize: "15px" }}>New</span>
                        <span className="" style={{ fontSize: "15px" }}>Category</span>
                    </Link>
                     {/* Export Button */}
                    <button onClick={() => exportToCSV(categories, "categories.csv")} className="button d-flex align-items-center" style={{ cursor: "pointer", marginLeft: "25px" }}>
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
                        <th style={{ padding: "12px", textAlign: "center" }}>Category Name</th>
                        <th style={{ padding: "12px", textAlign: "center" }}>Category Description</th>
                        <th style={{ padding: "12px", textAlign: "center" }}>Priority</th>
                        <th style={{ padding: "12px", textAlign: "center" }}>Registered</th>
                        <th style={{ padding: "12px", textAlign: "center" }}>Status</th>
                        <th style={{ padding: "12px", textAlign: "center" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody style={{ fontSize: "14px", color: "#4b5563", backgroundColor: "#E9EEFD" }}>
                      {currentCategories.map((category, index) => (
                        <tr
                          key={category._id}
                          style={{
                            borderBottom: "1px solid #e5e7eb",
                            backgroundColor: index % 2 === 0 ? "#F5FEFE" : "#E7F7F9",
                          }}
                        >
                          <td style={{ padding: "12px", textAlign: "center" }}>{index+ 1 + indexOfFirstCategory}</td>
                          <td style={{ padding: "12px", textAlign: "center" }}>
                          <img
                            src={`${image_url}${category.images[0]?.url}`}
                            alt="CategoryImage"
                            width="90"
                            height="55"
                          />
                          </td>
                          <td style={{ padding: "12px", textAlign: "center" }}>{category.categoryName}</td>
                          
                        {/* Truncated Description with Read More */}
                        <td style={{ padding: "12px", textAlign: "center" }} >
                              {category.description.length > 40
                                ? `${category.description.substring(0, 40).replace(/<[^>]+>/g, '')}...`
                                : category.description.replace(/<[^>]+>/g, '')}
                                <br />

                              {category.description.length > 40 && (
                                <button
                                  onClick={() => handleOpenModal(category.description)}
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
 
                          <td style={{ padding: "12px", textAlign: "center" }}>{category.priority}</td>
                          
                          <td style={{ padding: "12px", textAlign: "center" }}>
                          {new Date(category.createdAt).toLocaleString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </td>
                          
                          <td style={{ padding: "12px", textAlign: "center" }}>
                            <button
                              onClick={() => toggleStatus(index + indexOfFirstCategory)}
                              style={{
                                backgroundColor: category.status === "Active" ? "#08053B" : "#d1d5db",
                                color: category.status === "Active" ? "white" : "#374151",
                                padding: "6px 12px",
                                borderRadius: "12px",
                                fontSize: "12px",
                                border: "none",
                                cursor: "pointer",
                                marginRight: "5px",
                              }}
                            >
                              {category.status}
                            </button>
                          </td>
                          <td className='d-flex justify-content-center align-items-center mt-2' style={{ padding: "16px", textAlign: "center" }}>
                          <Link
                            to={`edit-category/${category._id}`}
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
                                alt="Edit Category"
                                style={{ width: "30px", height: "30px" }}
                            />
                        </Link>
                        
                        <button
                        onClick={() => handleDeleteClick(category)}
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
                      {currentCategories.length === 0 && (
                        <tr>
                          <td colSpan="15" style={{ textAlign: "center", padding: "12px", color: "#888", fontSize: "16px" }}>
                            No matching Category found.
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
                        onChange={handleCategoriesPerPageChange}
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
                        <span>Categories per page</span>
                    </div>
                    
                    <div
                        className="pagination d-flex justify-content-end align-items-center mt-0 mx-2"
                        style={{ marginTop: "16px", textAlign: "center", gap: "6px" }}
                    >
                        {[...Array(Math.ceil(filteredCategories.length / categoriesPerPage)).keys()].map(
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

export default Categorylist