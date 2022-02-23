import React from "react";

const Footer: React.FC = () => {
  return (
    <>
      <footer>
        <p>CIS Marketplace</p>
      </footer>

      <style jsx>{`
        footer {
          background: #000000;
          padding: 30px;
          margin-top: 35px;
        }

        p {
          text-align: center;
          font-weight: 800;
          color: #606060;
        }
      `}</style>
    </>
  );
};

export default Footer;
