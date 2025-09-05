import React, { useEffect, useState } from 'react'
import { exportToCSV } from "../utils/exportToCSV";
import { confirmDelete } from "../utils/confirmDelete";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Modal from '../components/ProductModel';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  image_url } from '../utils/base_url';
import productService from '../features/product/productService';

export const Productlist = () => {
  const [searchTerm, setSearchTerm] = useState("");
      const [products, setProducts] = useState([]);
       const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
          
      const [currentPage, setCurrentPage] = useState(1);
      const [productsPerPage, setProductsPerPage] = useState(5);
  


      useEffect(() => {
        const fetchProduts = async () => {
          try {
            const data = await productService.getAllProducts();
            setProducts(data);
          } catch (err) {
            setError(err.message || 'Error fetching  Products');
          } finally {
            setLoading(false);
          }
        };
      
        fetchProduts();
      }, []);
      
  
      console.log(products)


      // Filter products based on search input

      const filteredProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
        
  
  
      // Paginate products
      const indexOfLastProduct = currentPage * productsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
      const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
      // Handle delete action
      const handleDelete = async (id) => {
        try {
          const data = await productService.deleteProduct(id);
          
          setProducts((prevProduct) => prevProduct.filter((product) => product._id !== id));
      
          console.log(" Product deleted:", data);
          // toast.success('Product deleted successfully!')
        } catch (err) {
          setError(err.message || 'Error deleting Product');
          toast.error('Error deleting Product')
        } finally {
          setLoading(false);
        }
      };
     
      
      // Toggle product status
      const toggleStatus = (index) => {
        setProducts((prevProducts) =>
            prevProducts.map((product, i) =>
          i === index
              ? { ...product, status: product.status === "Active" ? "Inactive" : "Active" }
              : product
          )
      );
      };
  
      ;
  
      // Change page
      const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
      // Change products per page
      const handleProductsPerPageChange = (e) => {
      setProductsPerPage(Number(e.target.value));
      setCurrentPage(1); // Reset to first page when changing products per page
      };
  
 
  
       const handleDeleteClick = async (product) => {
                if (!product || !product.productName) {
                  // console.error("Invalid Product Name:", product);
                  toast.error("Invalid Product Name. Please try again!", {
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
                await confirmDelete(product.productName, () => handleDelete(product._id));
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
         <Meta title="Products" />
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
              <h1 className="fs-4 fw-bold mb-0">Products List</h1>
              <div className="d-flex align-items-center" style={{ gap: "8px" }}>
                <input
                  type="text"
                  placeholder="Search by Product Name"
                  className="form-control"
                  style={{ border: "1px solid #ccc", borderRadius: "6px", padding: "8px" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Link to='new-product' className="button" style={{ cursor: "pointer", marginLeft: "25px" }}>
                    <span className="" style={{marginRight:"5px",fontSize: "15px" }}>New</span>
                    <span className="" style={{ fontSize: "15px" }}>Product</span>
                </Link>
                 {/* Export Button */}
                <button onClick={() => exportToCSV(products, "products.csv")} className="button d-flex align-items-center" style={{ cursor: "pointer", marginLeft: "25px" }}>
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
                    <th style={{ padding: "12px", textAlign: "center" }}>Image</th>
                    <th style={{ padding: "12px", textAlign: "center" }}>Product Name</th>
                    <th style={{ padding: "12px", textAlign: "center" }}>Product Description</th>
                    <th style={{ padding: "12px", textAlign: "center" }}>Product Category</th>
                    <th style={{ padding: "12px", textAlign: "center" }}>Product SubCategory</th>
                    <th style={{ padding: "12px", textAlign: "center" }}>Length</th>
                    <th style={{ padding: "12px", textAlign: "center" }}>Width</th>
                    <th style={{ padding: "12px", textAlign: "center" }}>Height</th>
                    <th style={{ padding: "12px", textAlign: "center" }}>Product Price</th>
                    <th style={{ padding: "12px", textAlign: "center" }}>Num In Stock</th>
                    <th style={{ padding: "12px", textAlign: "center" }}>Priority</th>
                    <th style={{ padding: "12px", textAlign: "center" }}>Registered</th>
                    <th style={{ padding: "12px", textAlign: "center" }}>Status</th>
                    <th style={{ padding: "12px", textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: "14px", color: "#4b5563", backgroundColor: "#E9EEFD" }}>
                  {currentProducts.map((product, index) => (
                    <tr
                      key={product._id}
                      style={{
                        borderBottom: "1px solid #e5e7eb",
                        backgroundColor: index % 2 === 0 ? "#F5FEFE" : "#E7F7F9",
                      }}
                    >
                      <td style={{ padding: "12px", textAlign: "left" }}>{index+ 1 + indexOfFirstProduct}</td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                      <img
                        src={`${image_url}${product.images[0]?.url}`}
                        alt="ProductImage"
                        width="90"
                        height="55"
                      />
                      </td>
                      <td style={{ padding: "12px", textAlign: "center" }}>{product.productName}</td>
                      
                    {/* Truncated Description with Read More */}
                    <td style={{ padding: "12px", textAlign: "center" }} >
                              {product.description.length > 40
                                ? `${product.description.substring(0, 40).replace(/<[^>]+>/g, '')}...`
                                : product.description.replace(/<[^>]+>/g, '')}
                                <br />

                              {product.description.length > 40 && (
                                <button
                                  onClick={() => handleOpenModal(product.description)}
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
     
    
                      <td style={{ padding: "12px", textAlign: "center" }}>{product.subcategoryId.categoryId.categoryName}</td>
                      <td style={{ padding: "12px", textAlign: "center" }}>{product.subcategoryId.subcategoryName}</td>
                      <td style={{ padding: "12px", textAlign: "center" }}>{product.length}</td>
                      <td style={{ padding: "12px", textAlign: "center" }}>{product.width}</td>
                      <td style={{ padding: "12px", textAlign: "center" }}>{product.height}</td>
            
                      <td style={{ padding: "12px", textAlign: "center" }}>{product.price}</td>
                      <td style={{ padding: "12px", textAlign: "center" }}>{product.quantity}</td>
                      <td style={{ padding: "12px", textAlign: "center" }}>{product.priority}</td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                      {new Date(product.createdAt).toLocaleString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                        })} 
                      </td>
                      
                      <td style={{ padding: "12px", textAlign: "center" }}>
                        <button
                          onClick={() => toggleStatus(index + indexOfFirstProduct)}
                          style={{
                            backgroundColor: product.status === "Active" ? "#08053B" : "#d1d5db",
                            color: product.status === "Active" ? "white" : "#374151",
                            padding: "6px 12px",
                            borderRadius: "12px",
                            fontSize: "12px",
                            border: "none",
                            cursor: "pointer",
                            marginRight: "5px",
                          }}
                        >
                          {product.status}
                        </button>
                      </td>
                      <td className='d-flex justify-content-center align-items-center mt-2' style={{ padding: "16px", textAlign: "center" }}>
                      <Link
                        to={`edit-product/${product._id}`}
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
                            alt="Edit Product"
                            style={{ width: "30px", height: "30px" }}
                        />
                    </Link>
                    
                    <button
                    onClick={() => handleDeleteClick(product)}
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
                  {currentProducts.length === 0 && (
                    <tr>
                      <td colSpan="15" style={{ textAlign: "center", padding: "12px", color: "#888", fontSize: "16px" }}>
                        No matching Product found.
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
                    value={productsPerPage}
                    onChange={handleProductsPerPageChange}
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
                    <span>Products per page</span>
                </div>
                
                <div
                    className="pagination d-flex justify-content-end align-items-center mt-0 mx-2"
                    style={{ marginTop: "16px", textAlign: "center", gap: "6px" }}
                >
                    {[...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys()].map(
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
