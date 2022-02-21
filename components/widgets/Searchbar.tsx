import React from "react";

const Searchbar: React.FC = () => {
  return (
    <>
      <input type="text" placeholder="Search..." />
      <style jsx>{`
        input {
          background: var(--secondaryBackgroundColor);
          border: none;
          padding: 15px;
          width: 100%;
          border-radius: 50px;
          margin-top: 35px;
        }
      `}</style>
    </>
  );
};

export default Searchbar;
