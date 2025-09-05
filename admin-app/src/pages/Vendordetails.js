import React, { useState } from "react";
import { Divider } from "antd";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";

const Vendordetails = () => {
    const [vendorProducts, setVendorProducts] = useState([
        { id: 1, productName: "Modern Sofa Set", date: "June 26, 2025", status: "Published", brandName: "Urban Living", price: "$1000" },
        { id: 2, productName: "Vintage Table Lamp", date: "June 24, 2025", status: "Pending", brandName: "Luxe Lights", price: "$450" },
        { id: 3, productName: "Handwoven Area Rug", date: "June 20, 2025", status: "Published", brandName: "Cozy Textiles", price: "$1300" },
        { id: 4, productName: "Wall Art Canvas", date: "June 18, 2025", status: "Rejected", brandName: "Artistic Homes", price: "$600" },
        { id: 5, productName: "Decorative Throw Pillows", date: "June 15, 2025", status: "Rejected", brandName: "Comfy Living", price: "$200" },
        { id: 6, productName: "Minimalist Coffee Table", date: "June 10, 2025", status: "Published", brandName: "Elegant Spaces", price: "$2100" },
        { id: 7, productName: "Luxury Floor Vase", date: "June 5, 2025", status: "Pending", brandName: "Deco Master", price: "$1750" },
        { id: 8, productName: "Rustic Bookshelf", date: "June 2, 2025", status: "Published", brandName: "Timber Craft", price: "$900" },
        { id: 9, productName: "Abstract Wall Mirror", date: "May 30, 2025", status: "Pending", brandName: "Reflections", price: "$350" },
        { id: 10, productName: "Elegant Chandelier", date: "May 25, 2025", status: "Published", brandName: "Luxe Lights", price: "$2800" },
        { id: 11, productName: "Velvet Accent Chair", date: "May 20, 2025", status: "Rejected", brandName: "Comfy Living", price: "$700" },
        { id: 12, productName: "Bohemian Macrame Wall Hanging", date: "May 15, 2025", status: "Published", brandName: "Cozy Textiles", price: "$150" },
        { id: 13, productName: "Handmade Ceramic Vase", date: "May 10, 2025", status: "Pending", brandName: "Artisan Touch", price: "$450" },
        { id: 14, productName: "Scandinavian Wooden Clock", date: "May 5, 2025", status: "Published", brandName: "Minimal Designs", price: "$300" },
        { id: 15, productName: "Glass Coffee Table", date: "May 1, 2025", status: "Rejected", brandName: "Modern Deco", price: "$1250" }
      ]);

        const [vendorProductsPerPage, setVendorProductsPerPage] = useState(6);
        const [currentPage, setCurrentPage] = useState(1);
        const totalVendorProducts = vendorProducts.length;
        const totalPages = Math.ceil(totalVendorProducts / vendorProductsPerPage);
    
        const handleVendorProductsPerPageChange = (e) => {
        setVendorProductsPerPage(Number(e.target.value));
        setCurrentPage(1);
        };
    
        const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
        // Get current orders
        const indexOfLastVendorProducts = currentPage * vendorProductsPerPage;
        const indexOfFirstVendorProducts = indexOfLastVendorProducts - vendorProductsPerPage;
        const currentVendorProducts = vendorProducts.slice(indexOfFirstVendorProducts, indexOfLastVendorProducts);
        
    return (
        <>  
        <Meta title="Vendor Details" />
         <div className="container mt-4">
           <div className="card shadow-sm p-4">
             <h1 className="h4 mb-4">Vendor Details</h1>
             <div className="row">
               <div className="col-lg-3 mb-4">
                 <div className="card shadow-sm p-3 text-center d-flex align-items-center justify-content-center h-100">
                   <img 
                     src="https://cdn-icons-png.flaticon.com/512/7097/7097181.png"
                     alt="Profile of Vendor"
                     className="rounded-circle mb-3 "
                     width="150"
                     height="150"
                   />
                   <h2 className="h4">Karim Hazem</h2>
                   <a href="mailto:karimziadsaad@gmail.com" className="d-block mb-2" style={{color:"#17619D"}}>
                     karimziadsaad@gmail.com
                   </a>
                   <p className="text-semibold mt-1">Brand Name</p>
                   <p className="text-muted mt-1">(+02) 01120552462</p>
                   <Divider className="bold-divider" />
     
                   <div className="text-semibold text-start" style={{fontSize:"14px"}}>
                     <p>
                       <strong>Last Product:</strong> 7 days ago - <Link to="#" style={{"color":"#17619D"}}>product name</Link>
                     </p>
                     <p>
                       <strong>Average Product Value:</strong> $200.01
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
                     placeholder="Notes about vendor"
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
                     <h2 className="h6">Products</h2>
                     <p className="text-semibold">Total Earn $10950 on 20 products</p>
                   </div>
                   <div className="table-responsive">
                   <table className="table table-bordered">
                       <thead>
                         <tr>
                           <th>Id</th>
                           <th>Product Name</th>
                           <th>Brand Name</th>
                           <th>Date</th>
                           <th>Status</th>
                           <th>Product Price</th>
                         </tr>
                       </thead>
                       <tbody>
                         {currentVendorProducts.map((product, index) => (
                           <tr key={product.id} className={index % 2 === 0 ? "table-light" : ""}>
                             <td>{product.id}</td>
                             <td>{product.productName}</td>
                             <td>{product.brandName}</td>
                             <td>{product.date}</td>
                             <td>{product.status}</td>
                             <td>{product.price}</td>
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
                         value={vendorProductsPerPage}
                         onChange={handleVendorProductsPerPageChange}
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
                       <span>Products per page</span>
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
  )
}

export default Vendordetails