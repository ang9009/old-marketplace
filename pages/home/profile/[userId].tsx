import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";

import PrimaryButton from "../../../components/widgets/PrimaryButton";
import ListingsSection from "../../../components/ui/ListingsSection";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import getUser from "../../../utils/getUser";
import { GetServerSideProps } from "next";
import User from "../../../types/user.interface";
import Listing from "../../../types/listing.interface";

interface Props {
  userData: User;
  userListings: Listing[] | null;
  src: string;
}

const Index: React.FC<Props> = ({ userData, userListings, src }) => {
  const router = useRouter();

  const goToAddListingsPage = async () => {
    await router.push("/home/profile/add-listing");
  };

  return (
    <>
      <div className="page-container">
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
          <h1>{userData.name}'s Listings</h1>
          <div className="profile-actions-container">
            <div className="profile-navbar">
              <a href="">Available</a>
              <a href="">Reserved</a>
              <a href="">Sold</a>
            </div>
            <PrimaryButton text={"Add listing"} onClick={goToAddListingsPage} />
          </div>
        </section>
        <ListingsSection listings={userListings} />
      </div>

      <style jsx>{`
        .page-container {
          padding-top: 80px;
        }

        .profile-actions-container {
          display: flex;
          justify-content: space-between;
        }

        .user-image-container {
          position: relative;
          height: 270px;
          border: 1px solid var(--primaryBorderColor);
          box-sizing: initial;
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
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
          margin-top: 40px;
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.query.userId;
  const db = getFirestore();

  const { userData } = await getUser(userId as string);

  if (userData) {
    const profileImagePath = userData.profileImagePath;

    let userListings: Listing[] = [];
    const q = query(collection(db, "listings"), where("ownerId", "==", userData.id));
    const listingQuerySnapshot = await getDocs(q);
    if (listingQuerySnapshot) {
      listingQuerySnapshot.forEach((doc) => {
        userListings.push(doc.data() as Listing);
      });
    }

    if (profileImagePath) {
      const url = await getDownloadURL(ref(getStorage(), profileImagePath));

      return {
        props: {
          userData,
          userListings,
          src: url,
        },
      };
    } else {
      return {
        props: {
          userData,
          userListings,
          src: "/blank.png",
        },
      };
    }
  } else {
    return {
      notFound: true,
    };
  }
};

export default Index;
