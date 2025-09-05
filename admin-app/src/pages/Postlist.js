import React, { useEffect, useState } from 'react'
import { exportToCSV } from "../utils/exportToCSV";
import { confirmDelete } from "../utils/confirmDelete";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Modal from '../components/ProductModel';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import postService from '../features/post/postService';
import { image_url } from '../utils/base_url';

const Postlist = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
      

useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getAllPosts();
        setPosts(data);
      } catch (err) {
        setError(err.message || 'Error fetching posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  console.log(posts)




  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage, setPostsPerPage] = useState(5);

  // Filter posts based on search input

  const filteredPosts = posts.filter((post) =>
    post.postTitle.toLowerCase().includes(searchTerm.toLowerCase())
);
          
    
    
    // Paginate posts
    const indexOfLastPost = currentPage * categoriesPerPage;
    const indexOfFirstPost = indexOfLastPost - categoriesPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    // Handle delete action

    const handleDelete = async (id) => {
      try {
        const data = await postService.deletePost(id);
        
        setPosts((prevPost) => prevPost.filter((post) => post._id !== id));
    
        console.log("Post deleted:", data);
        // toast.success('Post deleted successfully!')
      } catch (err) {
        setError(err.message || 'Error deleting post');
        toast.error('Error deleting post')
      } finally {
        setLoading(false);
      }
    };
   
    
    // Toggle product status
    const toggleStatus = (index) => {
      setPosts((prevPosts) =>
          prevPosts.map((post, i) =>
        i === index
            ? { ...post, status: post.status === "Active" ? "Inactive" : "Active" }
            : post
        )
    );
    };

    

    // Change page
        const paginate = (pageNumber) => setCurrentPage(pageNumber);

        // Change products per page
        const handlePostsPerPageChange = (e) => {
        setPostsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when changing posts per page
        };



         const handleDeleteClick = async (post) => {
                  if (!post || !post.postTitle) {
                    // console.error("Invalid post Name:", post);
                    toast.error("Invalid post Name. Please try again!", {
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
                  await confirmDelete(post.postTitle, () => handleDelete(post._id));
                };
             
    
      const [showModal, setShowModal] = useState(false);
      const [selectedDescription, setSelectedDescription] = useState("");
    
      // const handleOpenModal = (desc) => {
      //   setSelectedDescription(desc);
      //   setShowModal(true);
      // };
  
      const handleOpenModal = (desc) => {
        const plainText = desc.replace(/<[^>]+>/g, '');   
        setSelectedDescription(plainText);
        setShowModal(true);
      };

      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error}</p>;
    

    return (
    <>
        <Meta title="Posts" />
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
                  <h1 className="fs-4 fw-bold mb-0">Posts List</h1>
                  <div className="d-flex align-items-center" style={{ gap: "8px" }}>
                    <input
                      type="text"
                      placeholder="Search by post Name"
                      className="form-control"
                      style={{ border: "1px solid #ccc", borderRadius: "6px", padding: "8px" }}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Link to='new-post' className="button" style={{ cursor: "pointer", marginLeft: "25px" }}>
                        <span className="" style={{marginRight:"5px",fontSize: "15px" }}>New</span>
                        <span className="" style={{ fontSize: "15px" }}>Post</span>
                    </Link>
                     {/* Export Button */}
                    <button onClick={() => exportToCSV(posts, "posts.csv")} className="button d-flex align-items-center" style={{ cursor: "pointer", marginLeft: "25px" }}>
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
                        <th style={{ padding: "12px", textAlign: "center" }}>Post Title</th>
                        <th style={{ padding: "12px", textAlign: "center" }}>Post Description</th>
                        <th style={{ padding: "12px", textAlign: "center" }}>Priority</th>
                        <th style={{ padding: "12px", textAlign: "center" }}>Registered</th>
                        <th style={{ padding: "12px", textAlign: "center" }}>Status</th>
                        <th style={{ padding: "12px", textAlign: "center" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody style={{ fontSize: "14px", color: "#4b5563", backgroundColor: "#E9EEFD" }}>
                      {currentPosts.map((post, index) => (
                        <tr
                          key={post._id}
                          style={{
                            borderBottom: "1px solid #e5e7eb",
                            backgroundColor: index % 2 === 0 ? "#F5FEFE" : "#E7F7F9",
                          }}
                        >
                          <td style={{ padding: "12px", textAlign: "center" }}>{index+ 1 + indexOfFirstPost}</td>
                          <td style={{ padding: "12px", textAlign: "center" }}>
                          <img
                            src={`${image_url}${post.images[0]?.url}`}
                            alt="PostImage"
                            width="90"
                            height="55"
                          />
                          </td>
                          <td style={{ padding: "12px", textAlign: "center" }}>{post.postTitle}</td>
                          
                        {/* Truncated Description with Read More */}
                        <td style={{ padding: "12px", textAlign: "center" }} >
                              {post.description.length > 40
                                ? `${post.description.substring(0, 40).replace(/<[^>]+>/g, '')}...`
                                : post.description.replace(/<[^>]+>/g, '')}
                                <br />

                              {post.description.length > 40 && (
                                <button
                                  onClick={() => handleOpenModal(post.description)}
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

                         
                          <td style={{ padding: "12px", textAlign: "center" }}>{post.priority}</td>
                          <td style={{ padding: "12px", textAlign: "center" }}>
                          {new Date(post.createdAt).toLocaleString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </td>
                          
                          <td style={{ padding: "12px", textAlign: "center" }}>
                            <button
                              onClick={() => toggleStatus(index + indexOfFirstPost)}
                              style={{
                                backgroundColor: post.status === "Active" ? "#08053B" : "#d1d5db",
                                color: post.status === "Active" ? "white" : "#374151",
                                padding: "6px 12px",
                                borderRadius: "12px",
                                fontSize: "12px",
                                border: "none",
                                cursor: "pointer",
                                marginRight: "5px",
                              }}
                            >
                              {post.status}
                            </button>
                          </td>
                          <td className='d-flex justify-content-center align-items-center mt-2' style={{ padding: "16px", textAlign: "center" }}>
                          <Link
                            to={`edit-post/${post._id}`}
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
                                alt="Edit post"
                                style={{ width: "30px", height: "30px" }}
                            />
                        </Link>
                        
                        <button
                        onClick={() => handleDeleteClick(post)}
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
                      {currentPosts.length === 0 && (
                        <tr>
                          <td colSpan="15" style={{ textAlign: "center", padding: "12px", color: "#888", fontSize: "16px" }}>
                            No matching post found.
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
                        onChange={handlePostsPerPageChange}
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
                        <span>posts per page</span>
                    </div>
                    
                    <div
                        className="pagination d-flex justify-content-end align-items-center mt-0 mx-2"
                        style={{ marginTop: "16px", textAlign: "center", gap: "6px" }}
                    >
                        {[...Array(Math.ceil(filteredPosts.length / categoriesPerPage)).keys()].map(
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

export default Postlist