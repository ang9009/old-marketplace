import React from "react";

const Footer: React.FC = () => {
  return (
    <>
      <footer>
        <p>CIS Marketplace</p>
      </footer>

      <style jsx>{`
        footer {
          margin-top: 35px;
          background: #000000;
          padding: 30px;
        }

        p {
          text-align: center;
          color: white;
        }
      `}</style>
    </>
  );
};

export default Footer;
