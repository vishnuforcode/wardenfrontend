import React, { useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { setAuth } from '../slice/AuthSlice'

import { Link } from 'react-router'
import { Toast } from 'bootstrap'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const successToastRef = useRef(null)
  const errorToastRef = useRef(null)

  const [formData, setFormData] = useState({ name: "", gmail: ""  , expectedRole : "warden"})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        'https://hostelmanagerbackend.onrender.com/login',
        formData,
        { withCredentials: true }
      )

      localStorage.setItem("currentAuth" , "true")
      // update redux
      dispatch(setAuth({
        isAuth : true ,
        userid: res.data.userId,
        username: res.data.username
      }))

      // show success toast
      const toast = new Toast(successToastRef.current)
      toast.show()

      setTimeout(() => navigate('/'), 1200)
    } catch (err) {
    //   console.log(err)
        alert("student cant login here !!")
      const toast = new Toast(errorToastRef.current)
      toast.show()
    }
  }

  return (
    <>
      {/* ✅ Toasts */}
      <div className="toast-container position-fixed top-0 end-0 p-3">
        <div
          ref={successToastRef}
          className="toast align-items-center text-bg-success border-0"
          role="alert"
        >
          <div className="d-flex">
            <div className="toast-body">✅ Login successful! Redirecting...</div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
          </div>
        </div>

        <div
          ref={errorToastRef}
          className="toast align-items-center text-bg-danger border-0"
          role="alert"
        >
          <div className="d-flex">
            <div className="toast-body">❌ Login failed! Check your username or email.</div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
          </div>
        </div>
      </div>

      {/* Main Login Form */}
      {/* Main Login Form */}
<div 
  className="container-fluid vh-100 d-flex align-items-center justify-content-center" 
  style={{ 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    overflow: 'hidden'   // <-- quietly removes scrollbars
  }}
>
  <div className="card shadow-lg rounded-4 p-4" style={{ maxWidth: '400px', width: '90%' }}>
    <div className="card-body">

      <h2 className="fw-bold text-center mb-3 text-primary">Welcome Back</h2>
      <p className="text-center text-muted small mb-4">Login to your account</p>

      <form onSubmit={handleSubmit} >
        <div className="mb-3">
          <label className="form-label small text-muted">Username</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control shadow-sm"
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label small text-muted">Gmail</label>
          <input
            type="email"
            name="gmail"
            value={formData.gmail}
            onChange={handleChange}
            className="form-control shadow-sm"
            placeholder="example@gmail.com"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 py-2 fw-bold shadow-sm">
          Login
        </button>
      </form>

      <div className="text-center mt-3">
        <span className="small text-muted">
          New user? <Link to={'/warden/register'} className="text-decoration-none text-primary">Register</Link>
        </span>
      </div>

    </div>
  </div>
</div>

    </>
  )
}

export default Login
