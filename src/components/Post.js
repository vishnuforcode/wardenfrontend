import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

function Post({ data }) {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const targetTime = new Date(data.tillTime).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeLeft('00:00:00');
        setSecondsLeft(0);
      } else {
        const totalSeconds = Math.floor(diff / 1000);
        setSecondsLeft(totalSeconds);

        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');

        setTimeLeft(`${hours}:${minutes}:${seconds}`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [data.tillTime]);

  // Status colors mapping
  const statusColors = {
    Done: '#28a745',       // Green
    Pending: '#ffc107',    // Yellow
    Seen: '#17a2b8',       // Teal / Blue
    default: '#6c757d',    // Gray fallback
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 d-flex">
      <div className="card w-100 m-2 card-hover">
        <div className="card-body d-flex flex-column">

          {/* Header */}
          <h5 className="card-title fw-semibold mb-1 text-white">
            {data.createdBy.name} <span className="h6 text-secondary">: {data.createdBy.role}</span>
          </h5>

          {/* Content */}
          <h6 className="card-subtitle mb-2 text-primary">{data.content}</h6>

          {data.conditions && (
            <p className="card-text small text-white mb-2">
              Conditions: "{data.conditions}"
            </p>
          )}

          {/* timer */}
          <span
            className={`badge px-3 py-2 mb-3 align-self-start ${secondsLeft <= 30 ? 'pulse' : ''}`}
            style={{
              background: secondsLeft <= 30
                ? 'linear-gradient(135deg, #ff416c, #ff4b2b)'
                : 'linear-gradient(135deg, #00b09b, #96c93d)',
              color: '#fff',
              borderRadius: '999px',
            }}
          >
            ⏳ alive time: <strong>{timeLeft}</strong>
          </span>

          {/* button */}
          <div className="mt-auto d-flex gap-2">
            <Link
              to={`/warden/post/${data._id}/status`}
              className="btn btn-outline-success btn-sm w-50"
            >
              Analyse
            </Link>

            <button className="btn btn-primary btn-sm w-50">
              <span
                className="h6"
                style={{ color: statusColors[data.status] || statusColors.default }}
              >
                {data.status}
              </span>
            </button>
          </div>
        </div>

        {/* Styles */}
        <style>{`
          .card-hover {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            border-radius: 1rem;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            background-color: #2c2d3a;
            color: #fff;
          }
          .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.5);
          }
          .card-hover .btn-primary {
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .card-hover .btn-outline-success {
            border-color: #4cd137;
            color: #4cd137;
          }
          .card-hover .btn-outline-success:hover {
            background-color: #4cd137;
            color: #fff;
          }
          .card-hover h6, .card-hover p, .card-hover .badge {
            color: #ccc;
          }
          .pulse {
            animation: pulse 1.2s infinite;
          }
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(255,75,43,0.6); }
            70% { box-shadow: 0 0 0 10px rgba(255,75,43,0); }
            100% { box-shadow: 0 0 0 0 rgba(255,75,43,0); }
          }
        `}</style>
      </div>
    </div>
  );
}

export default Post;
