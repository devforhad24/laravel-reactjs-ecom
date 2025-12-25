import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate star positions once on mount
    const starArray = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${Math.random() * 3 + 2}s`,
    }));
    setStars(starArray);
    document.title = "404 Not Found - FK Bazar";
  }, []);

  return (
    <div className="error-page-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Poppins:wght@400;500&display=swap');

        .error-page-wrapper {
          height: 100vh;
          width: 100vw;
          margin: 0;
          font-family: 'Poppins', sans-serif;
          color: #fff;
          overflow: hidden;
          background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: twinkle infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        .error-code {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(8rem, 15vw, 12rem);
          font-weight: 700;
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
          margin: 0;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .lead-message {
          font-size: 1.5rem;
          opacity: 0;
          animation: fadeInUp 1s ease-out 0.5s forwards;
        }

        .actions {
          opacity: 0;
          animation: fadeInUp 1s ease-out 1s forwards;
          margin-top: 2rem;
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .btn-launch {
          background-color: #667eea;
          color: white;
          padding: 12px 30px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .btn-launch:hover {
          background-color: #5a67d8;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .btn-outline {
          background: transparent;
          color: white;
          padding: 12px 30px;
          border-radius: 8px;
          border: 1px solid white;
          cursor: pointer;
          transition: 0.3s;
        }

        .btn-outline:hover {
          background: rgba(255,255,255,0.1);
        }

        .astronaut-container {
          position: absolute;
          width: 150px;
          top: 20%;
          right: 15%;
          animation: astronaut-float 20s infinite linear;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes astronaut-float {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-100px, 50px) rotate(90deg); }
          50% { transform: translate(-50px, 100px) rotate(180deg); }
          75% { transform: translate(50px, 50px) rotate(270deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }

        @media (max-width: 768px) {
          .astronaut-container { width: 80px; top: 10%; right: 5%; }
        }
      `}</style>

      {/* Stars Background */}
      <div className="stars-layer">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div style={{ textAlign: 'center', zIndex: 10 }}>
        <h1 className="error-code">404</h1>
        <p className="lead-message">Oops! You've drifted into the digital void.</p>
        <div className="actions">
          <Link to="/" className="btn-launch">
            Launch Back Home
          </Link>
          <button onClick={() => navigate(-1)} className="btn-outline">
            Go Back
          </button>
        </div>
      </div>

      {/* Astronaut */}
      <div className="astronaut-container">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="white">
            <path d="M100,10 C130,10 160,30 170,60 C180,90 170,120 150,140 C130,160 100,170 70,160 C40,150 20,120 20,90 C20,50 50,10 100,10 Z" fill="#E0E0E0"/>
            <circle cx="100" cy="70" r="30" fill="#A0C4FF"/>
            <rect x="80" y="110" width="40" height="60" rx="20" fill="#E0E0E0"/>
            <rect x="70" y="120" width="15" height="40" rx="7" fill="#E0E0E0"/>
            <rect x="115" y="120" width="15" height="40" rx="7" fill="#E0E0E0"/>
            <rect x="85" y="160" width="12" height="30" rx="6" fill="#E0E0E0"/>
            <rect x="103" y="160" width="12" height="30" rx="6" fill="#E0E0E0"/>
        </svg>
              </div>
    </div>
  );
};

export default NotFound;
