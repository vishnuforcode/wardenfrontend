import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Post from '../components/Post'

function Dashboard() {
  const [posts, setPosts] = useState([])
  const [activeView, setActiveView] = useState("students") 
  // students | warden

  useEffect(() => {
    const getAllPosts = async () => {
      const res = await axios.get(
        "http://localhost:8000/home",
        { withCredentials: true }
      )
      setPosts(res.data)
    }
    getAllPosts()
  }, [])

  const wardenPosts = posts.filter(
    p => p.createdBy?.role === "warden"
  )

  const studentPosts = posts.filter(
    p => p.createdBy?.role === "student"
  )

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">

        {/* sidebar  */}
        <div className="col-2 bg-dark text-white p-3">
          <h5 className="mb-4 text-center">Admin Panel</h5>

          <button
            className={`btn w-100 mb-2 ${
              activeView === "students" ? "btn-primary" : "btn-outline-light"
            }`}
            onClick={() => setActiveView("students")}
          >
            Student Posts
          </button>

          <button
            className={`btn w-100 ${
              activeView === "warden" ? "btn-primary" : "btn-outline-light"
            }`}
            onClick={() => setActiveView("warden")}
          >
            Warden Posts
          </button>
        </div>

        {/* right content  */}
        <div className="col-10 bg-light p-4 overflow-auto">
          <h4 className="mb-3">
            {activeView === "warden" ? "Warden Posts" : "Student Posts"}
          </h4>

          {(activeView === "warden" ? wardenPosts : studentPosts).length === 0 && (
            <p className="text-muted">No posts available</p>
          )}

          {(activeView === "warden" ? wardenPosts : studentPosts).map(p => (
            <Post key={p._id} data={p} />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Dashboard
