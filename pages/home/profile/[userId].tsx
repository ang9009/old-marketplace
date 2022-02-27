import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import PrimaryButton from "../../../components/widgets/PrimaryButton";
import RecommendedListings from "../../../components/ui/RecommendedListings";
import useGetCurrUser from "../../../hooks/useGetCurrUser";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const Index: React.FC = () => {
  const router = useRouter();
  const [src, setSrc] = useState(null);
  const userId = router.query.userId;
  const { userDocSnap } = useGetCurrUser();

  useEffect(() => {
    if (userDocSnap) {
      const profileImagePath = userDocSnap.profileImagePath;

      if (profileImagePath) {
        getDownloadURL(ref(getStorage(), profileImagePath)).then((url) => {
          setSrc(url);
        });
      } else {
        setSrc("/blank.png");
      }
    }
  }, [userDocSnap]);

  const goToAddListingsPage = () => {
    router.push("/home/profile/add-listing");
  };

  return (
    <>
      {userDocSnap && src && (
        <div className="page-container">
          <section className="hero">
            <div className="user-image-container">
              <div className="blur"></div>
              <img src={src} alt="" className="profile-picture" />
            </div>
            <div className="user-info">
              <h1 className="user-name">{userDocSnap.name}</h1>
              <p>{userDocSnap.email}</p>
            </div>
          </section>
          <section className="profile-content">
            <h1>User's Listings</h1>
            <div className="profile-actions-container">
              <div className="profile-navbar">
                <a href="">Available</a>
                <a href="">Reserved</a>
                <a href="">Sold</a>
              </div>
              <PrimaryButton text={"Add listing"} onClick={goToAddListingsPage} />
            </div>
            <RecommendedListings />
          </section>
        </div>
      )}

      <style jsx>{`
        .page-container {
          padding-top: 80px;
        }

        .profile-actions-container {
          display: flex;
          justify-content: space-between;
        }

        .profile-navbar {
        }

        .user-image-container {
          position: relative;
          height: 270px;
          border: 1px solid var(--primaryBorderColor);
          background: url("/cis.jpg");
          background-size: cover;
          box-sizing: initial;
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
        }

        .user-info {
          width: 100%;
          text-align: center;
        }

        .blur {
          border-radius: 12px;
          position: absolute;
          width: 100%;
          height: 100%;
          backdrop-filter: blur(10px);
        }

        .profile-picture {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 270px;
          height: 270px;
          object-fit: cover;
        }

        .profile-content {
          margin-top: 40px;
        }
      `}</style>
    </>
  );
};

export default Index;
