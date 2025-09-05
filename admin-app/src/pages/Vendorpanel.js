import React, { useState } from 'react'
import { exportToCSV } from "../utils/exportToCSV";
import { confirmDelete } from "../utils/confirmDelete";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Modal from '../components/ProductModel';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Vendorpanel = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [vendorPanels, setVendorPanels] = useState([
        { id: 1, image: "https://images.woodenstreet.de/image/cache/data%2Ffabric-sofa%2FMellisa-fabric-sofa%2F1-750x650.jpg", vendorName: "Karim", brand: "Bonus brand Arflex", productName: "Sofa",length:"100cm",width:"100cm",height:"100cm",productDescription:"how do you create product descriptions that not only inform but also persuade? In this step-by-step guide, we’ll break down the key elements of high-converting descriptions, provide real-world examples, and share actionable tips to help you craft compelling content that drives results.", productCategory: "Sofa", productSubCategory: "Living Room", productPrice: "$100", registered: "May 15, 2025", approval: "Rejected",status:"Active" },
        { id: 2, image: "https://mywakeup.in/cdn/shop/files/hall.png?v=1726134058&width=1214", vendorName: "Alice", brand: "Luxury Living", productName: "Dining Table",length:"100cm",width:"100cm",height:"100cm",productDescription:"how do you create product descriptions that not only inform but also persuade? In this step-by-step guide, we’ll break down the key elements of high-converting descriptions, provide real-world examples, and share actionable tips to help you craft compelling content that drives results." , productCategory: "Table", productSubCategory: "Dining Room", productPrice: "$300", registered: "June 20, 2025", approval: "Published",status:"Active" },
        { id: 3, image: "https://www.doimosalotti.com/img/716/living-rooms-armchairs-miranda_oen_11934.webp", vendorName: "John", brand: "Comfort Zone", productName: "Armchair",length:"100cm",width:"100cm",height:"100cm",productDescription:"how do you create product descriptions that not only inform but also persuade? In this step-by-step guide, we’ll break down the key elements of high-converting descriptions, provide real-world examples, and share actionable tips to help you craft compelling content that drives results." ,productCategory: "Chair", productSubCategory: "Living Room", productPrice: "$150", registered: "July 10, 2025", approval: "Pending",status:"Inactive" },
        { id: 4, image: "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2023/7/19/3/DOTY2023_Dramatic-Before-And-Afters_Hidden-Hills-11.jpg.rend.hgtvcom.1280.960.85.suffix/1689786863909.webp", vendorName: "Sophia", brand: "Modern Home", productName: "Coffee Table",length:"100cm",width:"100cm",height:"100cm",productDescription:"how do you create product descriptions that not only inform but also persuade? In this step-by-step guide, we’ll break down the key elements of high-converting descriptions, provide real-world examples, and share actionable tips to help you craft compelling content that drives results.", productCategory: "Table", productSubCategory: "Living Room", productPrice: "$200", registered: "August 5, 2025", approval: "Published",status:"Active" },
        { id: 5, image: "https://www.matterbrothersfurniture.com/blog/wp-content/uploads/sites/26/2021/04/iStock-505773698.jpg", vendorName: "Michael", brand: "Classic Designs", productName: "Bookshelf",length:"100cm",width:"100cm",height:"100cm",productDescription:"how do you create product descriptions that not only inform but also persuade? In this step-by-step guide, we’ll break down the key elements of high-converting descriptions, provide real-world examples, and share actionable tips to help you craft compelling content that drives results.", productCategory: "Storage", productSubCategory: "Living Room", productPrice: "$250", registered: "September 15, 2025", approval: "Rejected",status:"Active" },
        { id: 6, image: "https://www.mjmfurniture.com/cdn/shop/products/img_proxy_d6729445-b201-480c-88c8-98b41467ae4f_600x.jpg?v=1706710856", vendorName: "Emma", brand: "Eco Furniture", productName: "Recliner",length:"100cm",width:"100cm",height:"100cm",productDescription:"how do you create product descriptions that not only inform but also persuade? In this step-by-step guide, we’ll break down the key elements of high-converting descriptions, provide real-world examples, and share actionable tips to help you craft compelling content that drives results.", productCategory: "Chair", productSubCategory: "Living Room", productPrice: "$350", registered: "October 1, 2025", approval: "Published",status:"Inactive" },
        { id: 7, image: "https://www.thespruce.com/thmb/-Avgq5_KxAzqTAeui9qdegF7RPc=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc()/master-bedroom-in-new-luxury-home-with-chandelier-and-large-bank-of-windows-with-view-of-trees-1222623844-212940f4f89e4b69b6ce56fd968e9351.jpg", vendorName: "Liam", brand: "Artisan Creations", productName: "Bed Frame",length:"100cm",width:"100cm",height:"100cm",productDescription:"how do you create product descriptions that not only inform but also persuade? In this step-by-step guide, we’ll break down the key elements of high-converting descriptions, provide real-world examples, and share actionable tips to help you craft compelling content that drives results.", productCategory: "Bedroom", productSubCategory: "Furniture", productPrice: "$400", registered: "November 12, 2025", approval: "Pending",status:"Active" },
        { id: 8, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7i_b23Y33cMz2J3Th-P3GLxKM9z0P7u1alfNNhWpBr2jZlJGtW6uF_D3sgip1rnKDQTI&usqp=CAU", vendorName: "Olivia", brand: "Chic Interiors", productName: "Nightstand",length:"100cm",width:"100cm",height:"100cm",productDescription:"how do you create product descriptions that not only inform but also persuade? In this step-by-step guide, we’ll break down the key elements of high-converting descriptions, provide real-world examples, and share actionable tips to help you craft compelling content that drives results.", productCategory: "Bedroom", productSubCategory: "Furniture", productPrice: "$120", registered: "December 20, 2025", approval: "Published",status:"Active" },
        { id: 9, image: "https://i5.walmartimages.com/seo/Better-Homes-Gardens-Modern-Farmhouse-6-Drawer-Dresser-Rustic-White-Finish_67aed562-4498-4f42-80e8-17b77f276860.4a5560054b1dd3ad1ee0a2463bc53744.jpeg", vendorName: "Noah", brand: "Vintage Vibes", productName: "Dresser",length:"100cm",width:"100cm",height:"100cm",productDescription:"how do you create product descriptions that not only inform but also persuade? In this step-by-step guide, we’ll break down the key elements of high-converting descriptions, provide real-world examples, and share actionable tips to help you craft compelling content that drives results.", productCategory: "Bedroom", productSubCategory: "Storage", productPrice: "$500", registered: "January 15, 2026", approval: "Rejected",status:"Inactive" },
        { id: 10, image: "https://www.dreams.ie/media/catalog/product/cache/7e4edfa5b4afc55dcf19d7d30e1e5ed6/5/0/500-00082_main-shot_01_verona-footstool-taupe.jpg", vendorName: "Ava", brand: "Minimalist Designs", productName: "Ottoman",length:"100cm",width:"100cm",height:"100cm",productDescription:"how do you create product descriptions that not only inform but also persuade? In this step-by-step guide, we’ll break down the key elements of high-converting descriptions, provide real-world examples, and share actionable tips to help you craft compelling content that drives results.", productCategory: "Furniture", productSubCategory: "Living Room", productPrice: "$80", registered: "February 10, 2026", approval: "Published",status:"Inactive" },
    ]);
        



    const [currentPage, setCurrentPage] = useState(1);
    const [vendorPanelsPerPage, setVendorPanelsPerPage] = useState(5);

    // // Filter vendorPanels based on search input
    // const filteredVendorPanels = vendorPanels.filter((vendorPanel) =>
    //     vendorPanel.brand.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    const filteredVendorPanels = vendorPanels.filter(
        (panel) =>
          panel.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          panel.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          panel.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      


    // Paginate vendorPanels
    const indexOfLastVendorPanel = currentPage * vendorPanelsPerPage;
    const indexOfFirstVendorPanel = indexOfLastVendorPanel - vendorPanelsPerPage;
    const currentVendorPanels = filteredVendorPanels.slice(indexOfFirstVendorPanel, indexOfLastVendorPanel);

    // Handle delete action
    const handleDelete = (id) => {
      setVendorPanels((prevVendorsPanel) => prevVendorsPanel.filter((vendorpanel) => vendorpanel.id !== id));
    };
    // const handleDelete = (index) => {
    // setVendorPanels(vendorPanels.filter((_, i) => i !== index));
    // };

    // Toggle vendorPanel status
    const toggleStatus = (index) => {
    setVendorPanels((prevVendorPanels) =>
        prevVendorPanels.map((vendorPanel, i) =>
        i === index
            ? { ...vendorPanel, status: vendorPanel.status === "Active" ? "Inactive" : "Active" }
            : vendorPanel
        )
    );
    };

    // Toggle vendorPanel Approval
    const toggleApproval = (index) => {
        setVendorPanels((prevVendorPanels) =>
            prevVendorPanels.map((vendorPanel, i) =>
                i === index
                    ? {
                          ...vendorPanel,
                          approval:
                              vendorPanel.approval === "Pending"
                                  ? "Published"
                                  : vendorPanel.approval === "Published"
                                  ? "Rejected"
                                  : "Pending",
                      }
                    : vendorPanel
            )
        );
    };
    

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Change vendorPanels per page
    const handleVendorPanelsPerPageChange = (e) => {
    setVendorPanelsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing vendorPanels per page
    };


    // const handleDeleteClick = (index) => {
    // confirmDelete("Vendor Panel Product",() => handleDelete(index));
    // };

     const handleDeleteClick = async (vendorPanel) => {
              if (!vendorPanel || !vendorPanel.productName) {
                // console.error("Invalid Product Name:", panel);
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
              await confirmDelete(vendorPanel.productName, () => handleDelete(vendorPanel.id));
       };
         



    // const handleDeleteClick = (id) => {
    // confirmDelete("Vendor Panel Product",() => handleDelete(id));
    // };


  const [showModal, setShowModal] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");

  const handleOpenModal = (desc) => {
    setSelectedDescription(desc);
    setShowModal(true);
  };

    return (
    <>
     <Meta title="Vendor Panel" />
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
          <h1 className="fs-4 fw-bold mb-0">Vendor Panel List</h1>
          <div className="d-flex align-items-center" style={{ gap: "8px" }}>
            <input
              type="text"
              placeholder="Search by Brand,Vendor,Product Name"
              className="form-control"
              style={{ border: "1px solid #ccc", borderRadius: "6px", padding: "8px" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
             {/* Export Button */}
            <button onClick={() => exportToCSV(vendorPanels, "vendorPanels.csv")} className="button d-flex align-items-center" style={{ cursor: "pointer", marginLeft: "25px" }}>
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
                <th style={{ padding: "12px", textAlign: "center" }}>Vendor Name</th>
                <th style={{ padding: "12px", textAlign: "cneter" }}>Brand Name</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Product Name</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Length</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Width</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Height</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Product Description</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Product Category</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Product SubCategory</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Product Price</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Registered</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Approval</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Status</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "14px", color: "#4b5563", backgroundColor: "#E9EEFD" }}>
              {currentVendorPanels.map((vendorPanel, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #e5e7eb",
                    backgroundColor: index % 2 === 0 ? "#F5FEFE" : "#E7F7F9",
                  }}
                >
                  <td style={{ padding: "12px", textAlign: "left" }}>{index+ 1 + indexOfFirstVendorPanel}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                  <img
                    src={vendorPanel.image}
                    alt="ProductImage"
                    width="90"
                    height="55"
                  />
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{vendorPanel.vendorName}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{vendorPanel.brand}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{vendorPanel.productName}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{vendorPanel.length}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{vendorPanel.width}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{vendorPanel.height}</td>
                  {/* <td style={{ padding: "12px", textAlign: "center" }}>{vendorPanel.productDescription.substring(0, 10)}...</td> */}
        
                {/* Truncated Description with Read More */}
                <td style={{ padding: "12px", textAlign: "center" }}>
                            {vendorPanel.productDescription.length > 10
                            ? `${vendorPanel.productDescription.substring(0, 10)}...`
                            : vendorPanel.productDescription}
                            {vendorPanel.productDescription.length > 10 && (
                            <button 
                                onClick={() => handleOpenModal(vendorPanel.productDescription)}
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


                  <td style={{ padding: "12px", textAlign: "center" }}>{vendorPanel.productCategory}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{vendorPanel.productSubCategory}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{vendorPanel.productPrice}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{vendorPanel.registered}</td>
                  {/* <td style={{ padding: "12px", textAlign: "center" }}>{vendorPanel.approval}</td> */}
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <button
                        onClick={() => toggleApproval(index + indexOfFirstVendorPanel)}
                        style={{
                            backgroundColor:
                            vendorPanel.approval === "Published"
                            ? "#006023" 
                            : vendorPanel.approval === "Pending"
                            ? "#facc15"
                            : vendorPanel.approval === "Rejected"
                            ? "#ef4444"
                            : "#ef4444",
                         
                        color: "white",
                        padding: "6px 12px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        border: "none",
                        cursor: "pointer",
                        marginRight: "5px",
                        }}
                    >
                        {vendorPanel.approval}
                    </button>
                    </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <button
                      onClick={() => toggleStatus(index + indexOfFirstVendorPanel)}
                      style={{
                        backgroundColor: vendorPanel.status === "Active" ? "#08053B" : "#d1d5db",
                        color: vendorPanel.status === "Active" ? "white" : "#374151",
                        padding: "6px 12px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        border: "none",
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                    >
                      {vendorPanel.status}
                    </button>
                  </td>
                  <td className='d-flex justify-content-center align-items-center mt-2' style={{ padding: "16px", textAlign: "center" }}>
                  <Link
                    to={`vendor-detail/${vendorPanel.id}`}
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
                        alt="vendorPanel Detail"
                        style={{ width: "30px", height: "30px" }}
                    />
                </Link>
                
                <button
                onClick={() => handleDeleteClick(vendorPanel)}
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
              {currentVendorPanels.length === 0 && (
                <tr>
                  <td colSpan="16" style={{ textAlign: "center", padding: "12px", color: "#888", fontSize: "16px" }}>
                    No matching Vendor Panel found.
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
                value={vendorPanelsPerPage}
                onChange={handleVendorPanelsPerPageChange}
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
                <span>Vendor Panel per page</span>
            </div>
            
            <div
                className="pagination d-flex justify-content-end align-items-center mt-0 mx-2"
                style={{ marginTop: "16px", textAlign: "center", gap: "6px" }}
            >
                {[...Array(Math.ceil(filteredVendorPanels.length / vendorPanelsPerPage)).keys()].map(
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

export default Vendorpanel