import React, { useState } from "react";
import { exportToCSV } from "../utils/exportToCSV";
import { confirmDelete } from "../utils/confirmDelete";
import Meta from "../components/Meta";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const ReviewList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [reviews, setReviews] = useState([
    { id: 1, customer: "Karim", reviewTitle: "Bernhardt Plush Joli Sofa", product: "Bernhardt Furniture is a leader in furniture design...", priority: 5, status: "Active" },
    { id: 2, customer: "Saad", reviewTitle: "Modern Leather Couch", product: "Premium leather couch with elegant design...", priority: 4, status: "Inactive" },
    { id: 3, customer: "John", reviewTitle: "Oak Wood Dining Table", product: "High-quality oak wood dining table...", priority: 3, status: "Active" },
    { id: 4, customer: "Ziad", reviewTitle: "Ergonomic Office Chair", product: "Designed for comfort and productivity...", priority: 4, status: "Inactive" },
    { id: 5, customer: "David", reviewTitle: "Luxury Bed Frame", product: "Elegant wooden bed frame with a modern touch...", priority: 5, status: "Active" },
    { id: 6, customer: "Emma", reviewTitle: "Velvet Lounge Sofa", product: "Soft velvet finish with a contemporary design...", priority: 5, status: "Active" },
    { id: 7, customer: "Michael", reviewTitle: "Minimalist Coffee Table", product: "Sleek wooden coffee table with a modern touch...", priority: 3, status: "Active" },
    { id: 8, customer: "Sophia", reviewTitle: "Industrial Bookshelf", product: "Metal-framed bookshelf with solid wood shelves...", priority: 4, status: "Inactive" },
    { id: 9, customer: "Liam", reviewTitle: "Recliner Chair", product: "Comfortable recliner with lumbar support...", priority: 5, status: "Active" },
    { id: 10, customer: "Olivia", reviewTitle: "Marble Dining Table", product: "Luxury dining table with a polished marble top...", priority: 5, status: "Active" },
    { id: 11, customer: "Noah", reviewTitle: "Classic Wooden Wardrobe", product: "Spacious wooden wardrobe with multiple compartments...", priority: 4, status: "Inactive" },
    { id: 12, customer: "Ava", reviewTitle: "Modern TV Stand", product: "Sleek TV stand with storage drawers and cable management...", priority: 3, status: "Active" },
    { id: 13, customer: "William", reviewTitle: "Outdoor Patio Set", product: "Weather-resistant patio furniture set for outdoor use...", priority: 4, status: "Inactive" },
    { id: 14, customer: "Isabella", reviewTitle: "Luxe Bedside Table", product: "Elegant bedside table with gold-accented handles...", priority: 3, status: "Active" },
    { id: 15, customer: "James", reviewTitle: "Rustic Wooden Bench", product: "Solid pinewood bench with a rustic finish...", priority: 5, status: "Active" },
    { id: 16, customer: "Sophia", reviewTitle: "Adjustable Standing Desk", product: "Electric height-adjustable desk for ergonomic working...", priority: 5, status: "Active" },
    { id: 17, customer: "Ethan", reviewTitle: "Leather Reclining Sofa", product: "Spacious leather sofa with reclining function...", priority: 4, status: "Inactive" },
    { id: 18, customer: "Charlotte", reviewTitle: "Floating Wall Shelves", product: "Modern minimalist wall-mounted shelves for storage...", priority: 3, status: "Active" },
    { id: 19, customer: "Mason", reviewTitle: "Solid Wood Coffee Table", product: "Handcrafted solid wood coffee table with storage...", priority: 5, status: "Active" },
    { id: 20, customer: "Amelia", reviewTitle: "Convertible Sofa Bed", product: "Multi-functional sofa that converts into a bed...", priority: 4, status: "Inactive" },
  ]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage, setReviewsPerPage] = useState(5);

  // Filter reviews based on search input
  const filteredReviews = reviews.filter((review) =>
    review.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate reviews
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);

  // Handle delete action
  const handleDelete = (id) => {
    setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
  };
  // const handleDelete = (index) => {
  //   setReviews(reviews.filter((_, i) => i !== index));
  // };

  // Toggle review status
  const toggleStatus = (index) => {
    setReviews((prevReviews) =>
      prevReviews.map((review, i) =>
        i === index
          ? { ...review, status: review.status === "Active" ? "Inactive" : "Active" }
          : review
      )
    );
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Change reviews per page
  const handleReviewsPerPageChange = (e) => {
    setReviewsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing reviews per page
  };


  // const handleDeleteClick = (index) => {
  //   confirmDelete("review",() => handleDelete(index));
  // };

   const handleDeleteClick = async (review) => {
            if (!review || !review.reviewTitle) {
              // console.error("Invalid review:", review);
              toast.error("Invalid review. Please try again!", {
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
            await confirmDelete(review.reviewTitle, () => handleDelete(review.id));
          };
       

  // const handleDeleteClick = (id) => {
  //   confirmDelete("review",() => handleDelete(id));
  // };
  const { t } = useTranslation();

  return (
    <>
    <Meta title={t("reviewList.Reviews")} />

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
          <h1 className="fs-4 fw-bold mb-0">{t("reviewList.title")}</h1>
          <div className="d-flex align-items-center" style={{ gap: "8px" }}>
            <input
              type="text"
              placeholder={t("reviewList.searchPlaceholder")}              className="form-control"
              style={{ border: "1px solid #ccc", borderRadius: "6px", padding: "8px" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
             {/* Export Button */}
            <button onClick={() => exportToCSV(reviews, "reviews.csv")} className="button d-flex align-items-center" style={{ cursor: "pointer", marginLeft: "25px" }}>
                <span className="d-flex align-items-center" style={{ marginRight: "10px", fontSize: "18px" }}>📤</span>
                <span className="d-flex align-items-center" style={{ fontSize: "18px" }}>{t("reviewList.export")}</span>
            </button>
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", backgroundColor: "white", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#E9EEFD", color: "#374151", textTransform: "uppercase", fontSize: "14px" }}>
                <th style={{ padding: "12px", textAlign: "left" }}>ID</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Customer Name</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Review Title</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Product Name</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Priority</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Review Status</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "14px", color: "#4b5563", backgroundColor: "#E9EEFD" }}>
              {currentReviews.map((review, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #e5e7eb",
                    backgroundColor: index % 2 === 0 ? "#F5FEFE" : "#E7F7F9",
                  }}
                >
                  <td style={{ padding: "12px", textAlign: "left" }}>{index + 1 + indexOfFirstReview}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{review.customer}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{review.reviewTitle}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{review.product}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{review.priority}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <button
                      onClick={() => toggleStatus(index + indexOfFirstReview)}
                      style={{
                        backgroundColor: review.status === "Active" ? "#08053B" : "#d1d5db",
                        color: review.status === "Active" ? "white" : "#374151",
                        padding: "6px 12px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        border: "none",
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                    >
                      {review.status}
                    </button>
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <button
                    onClick={() => handleDeleteClick(review)}
                    style={{
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        padding: "0",
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
              {currentReviews.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "12px", color: "#888", fontSize: "16px" }}>
                    No matching reviews found.
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
      value={reviewsPerPage}
      onChange={handleReviewsPerPageChange}
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
    {[...Array(Math.ceil(filteredReviews.length / reviewsPerPage)).keys()].map(
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

export default ReviewList;

