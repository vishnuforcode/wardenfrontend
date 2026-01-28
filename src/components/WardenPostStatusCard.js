import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const WardenPostStatusCard = ({ post }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  if (!post) return <p className="text-center text-light py-5">Loading...</p>;

  return (
    <div className="card bg-dark text-light border border-secondary shadow-lg mb-4">
      {/* Card Header */}
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Post Review</h5>
        <span className="badge bg-secondary text-light">
          Current: {post.status || "Pending"}
        </span>
      </div>

      <div className="card-body">
        {/* Student Info */}
        <div className="mb-3">
          <small className="text-secondary">Student</small>
          <p className="fw-semibold mb-0">
            👤 {post.createdBy.name} | 🏠 Room {post.createdBy.roomNo || "N/A"}
          </p>
        </div>

        {/* Category */}
        <div className="mb-3">
          <small className="text-secondary">Category</small>
          <p className="mb-0">
            <span className="badge bg-secondary">{post.category || "General"}</span>
          </p>
        </div>

        {/* Full Description */}
        <div className="mb-4">
          <small className="text-secondary">Content</small>
          <p className="mt-1">{post.content}</p>
        </div>

        {/* Status Update Form */}
        <form onSubmit={async (e) => {
          e.preventDefault();
          const res = await axios.patch(
            `http://localhost:8000/warden/updateStatus/post/${post._id}`,
            { status },
            { withCredentials: true }
          );
          console.log(res.data);
          navigate("/");
        }}>
          <div className="row g-3 align-items-end">
            <div className="col-md-8">
              <label className="form-label fw-semibold">Update Status</label>
              <select
                className="form-select bg-secondary text-light border-0"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select new status</option>
                <option value="Pending">Pending</option>
                <option value="Seen">Seen</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="col-md-4 d-grid">
              <button type="submit" className="btn btn-success w-100">
                Update Status
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WardenPostStatusCard;
