import React from "react";

const SignupContainer: React.FC = ({ children }) => {
  return (
    <>
      <main>
        <div className="container">{children}</div>
        <div className="image"></div>
      </main>

      <style jsx>{`
        main {
          display: flex;
          background: var(--secondaryBackgroundColor);
        }

        .image {
          width: 50vw;
          min-height: 100vh;
          position: relative;
          background-image: url("/cis.jpg");
          background-size: cover;
        }

        .image::after {
          content: "";
          position: absolute;
          inset: 0;
          background: #000;
          z-index: 2;
          opacity: 0.4;
        }

        .container {
          width: 50vw;
          min-height: 100vh;
          background: #fff;
          font-size: 20px;
          position: relative;
        }
      `}</style>
    </>
  );
};

export default SignupContainer;
