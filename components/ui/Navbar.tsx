import React from "react";
import ProfilePicture from "../widgets/ProfilePicture";
import { GrCart } from "react-icons/gr";
import useRedirectWhenLoggedOut from "../../hooks/useRedirectWhenLoggedOut";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  useRedirectWhenLoggedOut();
  const router = useRouter();

  const redirectToHome = async () => {
    await router.push("/home");
  };

  return (
    <>
      <nav>
        <div>
          <img src={"/cislogo.png"} alt="CIS Logo" onClick={redirectToHome} />
        </div>
        <div className="nav-right">
          <GrCart size={"25px"} style={{ marginRight: "30px", cursor: "pointer" }} />
          <ProfilePicture size={"35px"} />
        </div>
      </nav>

      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100vw;
          background: var(--primaryBackgroundColor);
          padding: 20px 45px;
          box-shadow: 0px 8px 8px rgba(227, 227, 227, 0.25);
          height: var(--navbarHeight);
        }

        .nav-right {
          display: flex;
          align-items: center;
        }

        img {
          height: 35px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Navbar;
