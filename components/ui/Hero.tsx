import React from "react";

const Hero: React.FC = () => {
  return (
    <>
      <div className="container">
        <div className="text-container">
          <h1>CIS Marketplace</h1>
          <p>Save on textbooks, subscriptions, and more!</p>
        </div>
      </div>

      <style jsx>{`
        .container {
          background: url("./cis.jpg") fixed;
          background-size: cover;
          width: 100%;
          height: 328px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          position: relative;
          margin-top: 35px;
        }

        .container::after {
          content: "";
          background: #000000;
          z-index: 1;
          position: absolute;
          border-radius: 10px;

          opacity: 0.4;
          inset: 0;
        }

        .text-container {
          text-align: center;
          color: #fff;
          z-index: 2;
        }
      `}</style>
    </>
  );
};

export default Hero;
