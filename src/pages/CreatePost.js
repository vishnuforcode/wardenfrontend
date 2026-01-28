import React, { useState, useRef } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Toast } from 'bootstrap'

function CreatePost() {
  const userAuthId = useSelector((state) => state.auth.userid)
  const navigate = useNavigate()
  const toastRef = useRef(null)
  console.log(userAuthId)

  const [postData, setPostData] = useState({
    content: "",
    tillTime:"" ,
    conditions: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setPostData(prev => 
        ({ ...prev, [name]: value } )
    )
  }

const handleSubmit = async (e) => {
  e.preventDefault();

  const tillDate = new Date(postData.tillTime);
  const now = new Date();

  if (tillDate <= now) {
    alert("Please select a future date and time!");
    return;
  }

  try {
    const payload = { ...postData, tillTime: tillDate };
    await axios.post('https://hostelmanagerbackend.onrender.com/post', payload, { withCredentials: true });

    const toast = new Toast(toastRef.current);
    toast.show();

    setTimeout(() => navigate('/'), 1500);
  } catch (err) {
    console.log(err);
    navigate('/warden/login');
  }
};


  const isAuth = JSON.parse(localStorage.getItem("currentAuth"))

  return (
    <>
     
      <div className="toast-container position-fixed top-0 end-0 p-3">
        <div
          ref={toastRef}
          className="toast align-items-center text-bg-success border-0"
          role="alert"
        >
          <div className="d-flex">
            <div className="toast-body">✅ Post created successfully!</div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
          </div>
        </div>
      </div>

     
      <div
        className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
        style={{
          background: 'linear-gradient(135deg, #1e1f29 0%, #4e54c8 100%)',
          overflow: 'hidden'
        }}
      >
        {isAuth ? (
          <div className="card shadow-lg rounded-4 p-5" style={{ width: '100%', maxWidth: '500px', backgroundColor: '#2b2c3c' }}>
            <h2 className="fw-bold text-center text-white mb-3">Create a Post</h2>
            <p className="text-center text-white-50 small mb-4">Share an item with your community</p>

            <form onSubmit={handleSubmit} >
              <div className="mb-3">
                <label className="form-label small text-white-50">Content</label>
                <input
                  type="text"
                  name="content"
                  value={postData.content}
                  onChange={handleChange}
                  className="form-control shadow-sm"
                  placeholder="What are you sharing?"
                  style={{ backgroundColor: '#3a3b4e', color: '#fff', border: 'none' }}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label small text-white-50">Till Time</label>
                <input
                  type="datetime-local"
                  name="tillTime"
                  value={postData.tillTime}
                  onChange={handleChange}
                  className="form-control shadow-sm"
                  style={{ backgroundColor: '#3a3b4e', color: '#fff', border: 'none' }}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label small text-white-50">Conditions (optional)</label>
                <input
                  type="text"
                  name="conditions"
                  value={postData.conditions}
                  onChange={handleChange}
                  className="form-control shadow-sm"
                  placeholder="Any conditions?"
                  style={{ backgroundColor: '#3a3b4e', color: '#fff', border: 'none' }}
                />
              </div>

              <button
                type="submit"
                className="btn w-100 fw-bold shadow-sm"
                style={{
                  background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                  color: '#fff',
                  border: 'none'
                }}
              >
                Publish Post
              </button>
            </form>
          </div>
        ) : (
          <div className="card shadow-lg rounded-4 p-4 text-center" style={{ width: '100%', maxWidth: '400px', backgroundColor: '#2b2c3c' }}>
            <h5 className="mb-2 text-white">You are not logged in</h5>
            <p className="text-white-50 small mb-3">Please login to create a post</p>
            <button
              className="btn w-100"
              style={{ background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)', color: '#fff', border: 'none' }}
              onClick={() => navigate('/warden/login')}
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default CreatePost
