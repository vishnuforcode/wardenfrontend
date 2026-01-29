import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router"
import { Toast } from 'bootstrap'

function Register() {
  const navigate = useNavigate()
  const successToastRef = useState(null)
  const errorToastRef = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    hostelName: "",
    gmail: "",
    role: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  console.log();
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('https://hostelmanagerbackend.onrender.com/register', formData)
      // Navigate to login after registration
      navigate('/warden/login')
      console.log(formData)
    } catch (err) {
      console.log({ err })
    }
  }

  return (
    <>
      
      <div
        className="container-fluid vh-100 d-flex align-items-center justify-content-center"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          overflow: 'hidden' // removes scrollbars
        }}
      >
        <div className="card shadow-lg rounded-4 p-4" style={{ maxWidth: '400px', width: '90%' }}>
          <div className="card-body">

            <h2 className="fw-bold text-center mb-3 text-primary">Create Account</h2>
            <p className="text-center text-muted small mb-4">Register to start using the app</p>

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

              <div className="mb-3">
                <label className="form-label small text-muted">Hostel Name</label>
                <input
                  type="text"
                  name="hostelName"
                  value={formData.hostelName}
                  onChange={handleChange}
                  className="form-control shadow-sm"
                  placeholder="Enter your hostel"
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

               <div className="mb-3">
                <label className="form-label small text-muted">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="form-control shadow-sm"
                  placeholder="role"
                  required
                >
                  <option value="">select role-</option>
                  <option value="student">Student</option>
                  <option value="warden">Warden</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2 fw-bold shadow-sm">
                Register
              </button>
            </form>

            <div className="text-center mt-3">
              <span className="small text-muted">
                Already have an account? <a href="/warden/login" className="text-decoration-none text-primary">Login</a>
              </span>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Register
