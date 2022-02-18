import React from "react";
import PrimaryTextInput from "../components/widgets/PrimaryTextInput";

const index: React.FC = () => {
  return (
    <>
      <main>
        <div className="content">
          <h1>test</h1>
          <PrimaryTextInput placeholder={"deez"} name={"deez2"} />
        </div>
        <div className="image"></div>
      </main>

      <style jsx>{`
        main {
          display: flex;
          background: var(--secondaryBackgroundColor);
        }

        .content {
          width: 50vw;
          height: 100vh;
          background: #fff;
        }

        .image {
          width: 50vw;
          height: 100vh;
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
      `}</style>
    </>
  );
};

export default index;
