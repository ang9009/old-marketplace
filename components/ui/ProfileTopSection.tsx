import React from "react";
import { useRouter } from "next/router";

import User from "../../types/user.interface";
import PrimaryButton from "../widgets/PrimaryButton";

interface Props {
  userData: User;
  src: string;
}

const ProfileTopSection: React.FC<Props> = ({ userData, src }) => {
  const router = useRouter();
  console.log(router.basePath);

  const goToAddListingsPage = async () => {
    await router.push("/home/profile/add-listing");
  };

  return (
    <>
      <section className="hero">
        <div className="user-image-container">
          <div className="blur"></div>
          <img src={src} alt="" className="profile-picture" />
        </div>
        <div className="user-info">
          <h1 className="user-name">{userData.name}</h1>
          <p className="user-email">{userData.email}</p>
        </div>
      </section>
      <section className="profile-content">
        <h1 className="listing-section-title">{userData.name}'s Listings</h1>
        <div className="profile-actions-container">
          <ul className="profile-navbar">
            <li>
              <a href="" className="navbar-available">
                Available
              </a>
            </li>
            <li>
              <a href="">Reserved</a>
            </li>
            <li>
              <a href="">Sold</a>
            </li>
          </ul>
          <PrimaryButton text={"Add listing"} onClick={goToAddListingsPage} />
        </div>
      </section>

      <style jsx>{`
        .profile-navbar {
          margin-top: 20px;
          display: flex;
          list-style: none;
        }

        .profile-navbar li {
          margin-right: 20px;
        }

        .profile-navbar li a {
          color: #000;
          text-decoration: none;
          font-weight: bold;
        }

        .navbar-available {
          color: ${router.basePath.split("/")[2] === "available" && "red"};
        }

        .listing-section-title {
          font-size: 30px;
        }

        .profile-actions-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .user-image-container {
          position: relative;
          height: 270px;
          border: 1px solid var(--primaryBorderColor);
          box-sizing: initial;
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: var(--primaryBoxShadow);
        }

        .blur {
          position: absolute;
          background: ${src == "/blank.png" ? "#000" : `url(${src})`};
          background-size: cover;
          width: 100%;
          height: 100%;
          filter: ${src == "/blank.png" || "brightness(0.5)"};
        }

        .profile-picture {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 270px;
          height: 270px;
          object-fit: cover;
        }

        .user-info {
          width: 100%;
          text-align: center;
          margin-top: 15px;
        }

        .profile-content {
          margin-top: 70px;
        }

        .user-email {
          color: #949494;
          font-size: 15px;
          margin-top: 3px;
        }
      `}</style>
    </>
  );
};

export default ProfileTopSection;
