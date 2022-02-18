import React from "react";

const SignupContainer: React.FC = ({children}) => {
  return <>
          <main>
            <div className="container">
              {children}
            </div>
            <div className="image"></div>
          </main>

          <style jsx>{`
            main {
                      display: flex;
                      background: var(--secondaryBackgroundColor);
                    }

                    .container {
                      width: 50vw;
                      height: 100vh;
                      background: #fff;
                      font-size: 20px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      color: var(--primaryColor);
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
  </>;
}

export default SignupContainer;