import React, { useState } from "react";
import fortunes from "./fortunes";

export default function App() {
  const [fortune, setFortune] = useState("");
  const [canCrack, setCanCrack] = useState(true);
  const [adsWatched, setAdsWatched] = useState(false);
  const [isCracking, setIsCracking] = useState(false);

  const crackCookie = () => {
    if (!canCrack || isCracking) return;
    setIsCracking(true);
    setTimeout(() => {
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      setFortune(randomFortune);
      setCanCrack(false);
      setAdsWatched(false);
      setIsCracking(false);
    }, 1500);
  };

  const watchAd = () => {
    setAdsWatched(true);
    setCanCrack(true);
    setFortune("");
  };

  return (
    <>
      <div className="container">
        <h1 className="title">Fortune Cookie</h1>

        <div
          className={`cookie ${isCracking ? "crack" : ""} ${!canCrack ? "disabled" : ""}`}
          onClick={crackCookie}
          role="button"
          tabIndex={0}
          aria-disabled={!canCrack}
        >
          <img
            src="https://cdn.pixabay.com/photo/2014/12/21/23/38/fortune-cookie-575751_1280.png"
            alt="Fortune Cookie"
            className="cookie-image"
            draggable={false}
          />
          {!isCracking && !fortune && <div className="cookie-text">까기</div>}
          {isCracking && <div className="cracking-text">까지는 중...</div>}
        </div>

        {fortune && (
          <div className="fortune-text">
            {fortune}
          </div>
        )}

        {!canCrack && !adsWatched && (
          <button className="ad-button" onClick={watchAd}>
            광고보고 새 쿠키 까기
          </button>
        )}
      </div>

      <style jsx="true">{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .container {
          min-height: 100vh;
          background: linear-gradient(270deg, #5a3a00, #9a4e00, #c9b243);
          background-size: 600% 600%;
          animation: gradientShift 20s ease infinite;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          color: #5a2a0c;
          padding: 20px;
          text-align: center;
        }

        .title {
          font-size: 3rem;
          margin-bottom: 30px;
          color: #fff8dc;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        }

        .cookie {
          width: 140px;
          height: 140px;
          background: #f6e2b3;
          border-radius: 50%;
          box-shadow:
            inset -5px -5px 10px #fef8e3,
            inset 5px 5px 10px #d9c187,
            4px 4px 8px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          user-select: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: transform 0.2s ease;
          margin-bottom: 20px;
        }

        .cookie:hover {
          transform: scale(1.1) rotate(-5deg);
        }

        .cookie.disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .cookie.crack {
          animation: crackShake 1.5s ease forwards;
        }

        @keyframes crackShake {
          0% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.1) rotate(10deg); }
          50% { transform: scale(0.9) rotate(-10deg); }
          75% { transform: scale(1.05) rotate(7deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 0.9; }
        }

        .cookie-image {
          width: 80px;
          height: 80px;
          pointer-events: none;
        }

        .cookie-text,
        .cracking-text {
          position: absolute;
          bottom: 10px;
          font-weight: bold;
          font-size: 1.1rem;
          color: #7a4c00;
          text-shadow: 0 0 3px rgba(255, 255, 255, 0.6);
          user-select: none;
        }

        .fortune-text {
          font-size: 1.3rem;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 15px;
          padding: 15px 20px;
          max-width: 350px;
          margin: 20px auto;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          color: #5a2a0c;
        }

        .ad-button {
          background: linear-gradient(45deg, #d35400, #f1c40f);
          border: none;
          padding: 12px 30px;
          border-radius: 30px;
          color: white;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(179, 82, 0, 0.7);
          transition: all 0.3s ease;
          margin-top: 20px;
        }

        .ad-button:hover {
          background: linear-gradient(45deg, #f1c40f, #d35400);
          transform: translateY(-2px);
        }

        .ad-button:active {
          transform: translateY(1px);
          box-shadow: 0 3px 6px rgba(179, 82, 0, 0.6);
        }
      `}</style>
    </>
  );
}
