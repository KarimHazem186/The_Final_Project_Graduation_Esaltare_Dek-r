import React, { useEffect, useState } from 'react'
import { exportToCSV } from "../utils/exportToCSV";
import { confirmDelete } from "../utils/confirmDelete";
import Meta from "../components/Meta";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import announcementService from '../features/announcement/announcementService';
import { image_url } from '../utils/base_url';

const Announcementlist = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [announcements, setAnnouncements] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  


          useEffect(() => {
            const fetchCategories = async () => {
              try {
                const data = await announcementService.getAllAnnouncements();
                setAnnouncements(data);
              } catch (err) {
                setError(err.message || 'Error fetching announcements');
              } finally {
                setLoading(false);
              }
            };
          
            fetchCategories();
          }, []);
          
      
          console.log(announcements)
  


    const [currentPage, setCurrentPage] = useState(1);
    const [announcementsPerPage, setAnnouncementsPerPage] = useState(5);
  

    // Filter announcements based on search input
    const filteredAnnouncements = announcements.filter((announcement) =>
        announcement.announcementTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Paginate 
    const indexOfLastAnnouncement = currentPage * announcementsPerPage;
    const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
    const currentAnnouncements = filteredAnnouncements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

    // Handle delete action
    // const handleDelete = (index) => {
    // setAnnouncements(announcements.filter((_, i) => i !== index));
    // };

      const handleDelete = async (id) => {
        try {
          const data = await announcementService.deleteAnnouncement(id);
          
          setAnnouncements((prevAnnouncements) => prevAnnouncements.filter((announcement) => announcement._id !== id));
      
          console.log("Announcement deleted:", data);
          // toast.success('Announcement deleted successfully!')
        } catch (err) {
          setError(err.message || 'Error deleting announcement');
          toast.error('Error deleting announcement')
        } finally {
          setLoading(false);
        }
      };
          


    // Toggle review status
    const toggleStatus = (index) => {
        setAnnouncements((prevAnnouncements) =>
            prevAnnouncements.map((announcement, i) =>
            i === index
            ? { ...announcement, status: announcement.status === "Active" ? "Inactive" : "Active" }
            : announcement
        )
        );
    };

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Change announcements per page
    const handleAnnouncementsPerPageChange = (e) => {
        setAnnouncementsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when changing announcements per page
    };


    
  //   const handleDeleteClick = (id) => {
  //     confirmDelete("announcement",() => handleDelete(id));
  // };


  const handleDeleteClick = async (announcement) => {
        if (!announcement || !announcement.announcementTitle) {
          // console.error("Invalid announcement:", announcement);
          toast.error("Invalid announcement. Please try again!", {
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
        await confirmDelete(announcement.title, () => handleDelete(announcement._id));
      };
  

    // const handleDeleteClick = (index) => {
    //     confirmDelete("announcement",() => handleDelete(index));
    // };

      
  return ( 
    <>
    <Meta title="Announcements" />
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
                      <h1 className="fs-4 fw-bold mb-0">Announcement List</h1>
                      <div className="d-flex align-items-center" style={{ gap: "8px" }}>
                        <input
                          type="text"
                          placeholder="Search by Announcement Title"
                          className="form-control"
                          style={{ border: "1px solid #ccc", borderRadius: "6px", padding: "8px" }}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Link to='new-announcement' className="button" style={{ cursor: "pointer", marginLeft: "25px" }}>
                        <span className="" style={{marginRight:"5px",fontSize: "15px" }}>New</span>
                        <span className="" style={{ fontSize: "15px" }}>Announcement</span>
                        </Link>
                         {/* Export Button */}
                        <button onClick={() => exportToCSV(announcements, "announcements.csv")} className="button d-flex align-items-center" style={{ cursor: "pointer", marginLeft: "15px" }}>
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
                            <th style={{ padding: "12px", textAlign: "center" }}>Announcement Image</th>
                            <th style={{ padding: "12px", textAlign: "center" }}>Announcement Title</th>
                            <th style={{ padding: "12px", textAlign: "center" }}>Percentage</th>
                            <th style={{ padding: "12px", textAlign: "center" }}>Announcement Status</th>
                            <th style={{ padding: "12px", textAlign: "center" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody style={{ fontSize: "14px", color: "#4b5563", backgroundColor: "#E9EEFD" }}>
                          {currentAnnouncements.map((announcement, index) => (
                            <tr
                              key={announcement._id}
                              style={{
                                borderBottom: "1px solid #e5e7eb",
                                backgroundColor: index % 2 === 0 ? "#F5FEFE" : "#E7F7F9",
                              }}
                            >
                              <td style={{ padding: "12px", textAlign: "left" }}>{index + 1 + indexOfFirstAnnouncement}</td>
                              <td style={{ padding: "12px", textAlign: "center" }}>
                              <img
                                src={`${image_url}${announcement.images[0]?.url}`}
                                alt={announcement.announcementTitle}
                                style={{ width: "100px", height: "50px", borderRadius: "8px" }}
                               />
                              </td>
                              <td style={{ padding: "12px", textAlign: "center" }}>{announcement.announcementTitle}</td>
                              <td style={{ padding: "12px", textAlign: "center" }}>{announcement.percentage}</td>
                              <td style={{ padding: "12px", textAlign: "center" }}>
                                <button
                                  onClick={() => toggleStatus(index + indexOfFirstAnnouncement)}
                                  style={{
                                    backgroundColor: announcement.status === "Active" ? "#08053B" : "#d1d5db",
                                    color: announcement.status === "Active" ? "white" : "#374151",
                                    padding: "6px 12px",
                                    borderRadius: "12px",
                                    fontSize: "12px",
                                    border: "none",
                                    cursor: "pointer",
                                    marginRight: "5px",
                                  }}
                                >
                                  {announcement.status}
                                </button>
                              </td>
                              <td className='d-flex justify-content-center align-items-center' style={{ padding: "12px", textAlign: "center" }}>
                              <Link
                                  to={`edit-announcement/${announcement._id}`}
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
                                    alt="Edit Announcement"
                                    style={{ width: "25px", height: "25px" }}
                                  />
                                </Link>
                                
                                <button
                                onClick={() => handleDeleteClick(announcement)}
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
                          {currentAnnouncements.length === 0 && (
                            <tr>
                              <td colSpan="7" style={{ textAlign: "center", padding: "12px", color: "#888", fontSize: "16px" }}>
                                No matching announcements found.
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
                  value={announcementsPerPage}
                  onChange={handleAnnouncementsPerPageChange}
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
                {[...Array(Math.ceil(filteredAnnouncements.length / announcementsPerPage)).keys()].map(
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

export default Announcementlist