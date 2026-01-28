import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Post from '../components/Post'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

function Home() {
  const navigate = useNavigate()
  const [Posts, setPosts] = useState([])
  console.log(Posts)
  // const isAuth = useSelector((state) => state.auth.currentAuth)
  const isAuth = JSON.parse(localStorage.getItem("currentAuth"))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("http://localhost:8000/home", { withCredentials: true })
        setPosts(data.data)
      } catch (err) {
        if (err.response && err.response.status === 401) {

          setTimeout(() => {
            navigate('/warden/login')
          }, 1500);
          
          
        } else {
          console.error(err.message)
        }
      }
    }
    fetchData()
  }, [navigate])

  if (!isAuth) {
    return (
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center"
           style={{ background: 'linear-gradient(135deg, #1e1f29 0%, #4e54c8 100%)', overflow: 'hidden' }}>
        <div className="text-center text-white">
          <h3>Please Login to see posts</h3>
          <p className="small">You need to be logged in to access the marketplace</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid min-vh-100 py-4"
         style={{ background: 'linear-gradient(135deg, #1e1f29 0%, #2c2d3a 100%)', overflowY: 'auto' }}>

      <div className="container">
        <h2 className="text-center mb-5 fw-bold text-white">Hostelers Problems...</h2>

        {Posts.length === 0 ? (
          <div className="text-center mt-5 text-white">
  <p className="mt-2 text-white-50 d-flex justify-content-center align-items-center gap-2">
    
    <span className="live-dot"></span>
    <span>
      No <strong className="text-success">Live</strong> posts available...
    </span>

  </p>

  <style>{`
    .live-dot {
      width: 10px;
      height: 10px;
      background: #2ecc71;
      border-radius: 50%;
      position: relative;
    }

    .live-dot::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 10px;
      height: 10px;
      background: rgba(46, 204, 113, 0.6);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: livePulse 1.5s infinite;
    }

    @keyframes livePulse {
      0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.8;
      }
      70% {
        transform: translate(-50%, -50%) scale(2.2);
        opacity: 0;
      }
      100% {
        opacity: 0;
      }
    }
  `}</style>
</div>

        ) : (
          <div className="row g-4 justify-content-center">
            {Posts.map((post) => (
              
              <Post key={post._id} data={post} />
              
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
