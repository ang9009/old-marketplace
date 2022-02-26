import React, { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { GetServerSideProps } from "next";
import Listing from "../../../types/listing.interface";
import { BiLinkExternal } from "react-icons/bi";

import capitalise from "../../../utils/capitalise";
import Condition from "../../../types/condition.enum";
import PrimaryButton from "../../../components/widgets/PrimaryButton";
import useGetUser from "../../../hooks/useGetUser";

interface Props {
  listing: Listing;
  listingImageUrl: string;
  sellerName: string;
  sellerProfilePictureUrl: string;
}

const ListingPage: React.FC<Props> = ({ listing, listingImageUrl, sellerName, sellerProfilePictureUrl }) => {
  const db = getFirestore();
  const [isReserved, setIsReserved] = useState(null);
  const { authUser } = useGetUser();

  useEffect(() => {
    if (listing) {
      if (listing.state === "available") {
        setIsReserved(false);
      } else {
        setIsReserved(true);
      }
    }
  }, [listing]);

  const updateListingState = async () => {
    setIsReserved(!isReserved);
    const listingRef = doc(db, "listings", listing.id);

    if (!isReserved) {
      await updateDoc(listingRef, {
        state: "reserved",
        buyerId: authUser.uid,
      });
    } else {
      await updateDoc(listingRef, {
        state: "available",
        buyerId: null,
      });
    }
  };

  function getConditionTagColor(condition: Condition) {
    switch (condition) {
      case "new":
        return "#36BD64";
      case "like new":
        return "#11AE20";
      case "very good":
        return "#6EB811";
      case "good":
        return "#af70ee";
      case "acceptable":
        return "#955454";
    }
  }

  return (
    <>
      <div className="page-container">
        <div className="listing-image-container">
          <Zoom wrapStyle={{ width: "100%", height: "100%" }} zoomMargin={0}>
            <img src={listingImageUrl} alt="" className="listing-image" />
          </Zoom>
        </div>

        <section className="listing-information-container">
          <div className="listing-content-container">
            <div className="listing-tags">
              <div className="year-level-tag tag">Y{listing.yearLevel}</div>
              {listing.subject && <div className="subject-tag tag">{listing.subject}</div>}
              <div className="type-tag tag">{capitalise(listing.type)}</div>
              <div
                className="condition-tag tag"
                style={{ background: getConditionTagColor(listing.condition) }}
              >
                {capitalise(listing.condition)}
              </div>
            </div>
            <p className="listing-name">{listing.name}</p>
            <h1 className="listing-price">${listing.price}</h1>
            <div className="divider"></div>
            <h1>Description</h1>
            <p className="listing-description">{listing.description}</p>
          </div>

          <div className="listing-actions-container">
            <h1>Meet the seller</h1>
            <div className="seller-info-container">
              <img src={sellerProfilePictureUrl} alt="" className="seller-profile-picture" />
              <h1 className="seller-name">{sellerName}</h1>
              <a href="" className="seller-profile-link">
                <BiLinkExternal size={12} />
              </a>
            </div>
            <PrimaryButton
              text={isReserved ? "Unreserve listing" : "Reserve listing"}
              width={"100%"}
              onClick={updateListingState}
              background={isReserved ? "var(--secondaryButtonColor)" : "var(--primaryButtonColor)"}
            />
          </div>
        </section>
      </div>

      <style jsx>{`
        .page-container {
          padding-top: 40px;
        }

        .divider {
          width: 100%;
          height: 2px;
          margin: 20px 0;
          background: #e5e5e5;
        }

        .listing-description {
          margin-top: 10px;
          color: #646464;
        }

        .listing-tags {
          display: flex;
        }

        .tag {
          margin-right: 10px;
          padding: 3px 12px;
          font-size: 12px;
          font-weight: 600;
          color: #fff;
        }

        .year-level-tag {
          background: #ff8c00;
        }

        .subject-tag {
          background: #ed4343;
        }

        .type-tag {
          background: #3f6ce1;
        }

        .listing-image-container {
          display: grid;
          place-items: center;
          height: 400px;
          background: #000;
          border-radius: 12px;
          border: 1px solid var(--primaryBorderColor);
          box-sizing: initial;
        }

        .listing-content-container {
          width: 70%;
        }

        .listing-image {
          width: 100%;
          height: 400px;
          object-fit: contain;
        }

        .listing-name {
          font-size: 20px;
          font-weight: 500;
          margin-top: 15px;
        }

        .listing-price {
          font-size: 30px;
        }

        .listing-actions-container {
          width: 30%;
          height: max-content;
          margin-left: 30px;
          background: #fff;
          border-radius: 12px;
          padding: 30px;
          box-shadow: rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
        }

        .listing-information-container {
          margin-top: 25px;
          display: flex;
          justify-content: space-between;
        }

        .seller-info-container {
          margin: 15px 0;
          display: flex;
          align-items: center;
        }

        .seller-name {
          font-size: 16px;
          margin-right: 10px;
          margin-left: 10px;
        }

        .seller-profile-picture {
          width: 30px;
          border-radius: 50%;
        }

        .seller-profile-link {
          color: #a5a5a5;
        }
      `}</style>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const listingId = context.query.listingId as string;
  const db = getFirestore();
  const listingDocRef = doc(db, "listings", listingId);
  const listingDocSnap = await getDoc(listingDocRef);

  const listing: Listing = {
    id: listingDocSnap.get("id"),
    ownerId: listingDocSnap.get("ownerId"),
    buyerId: listingDocSnap.get("buyerId"),
    name: listingDocSnap.get("name"),
    description: listingDocSnap.get("description"),
    condition: listingDocSnap.get("condition"),
    state: listingDocSnap.get("state"),
    type: listingDocSnap.get("type"),
    yearLevel: listingDocSnap.get("yearLevel"),
    subject: listingDocSnap.get("subject"),
    price: listingDocSnap.get("price"),
  };

  const listingImageStorageRef = ref(getStorage(), listingId);
  const listingImageUrl = await getDownloadURL(listingImageStorageRef);

  const sellerDocRef = doc(db, "users", listing.ownerId);
  const sellerDocSnap = await getDoc(sellerDocRef);
  const sellerName = sellerDocSnap.get("name");
  const sellerProfileImagePath = sellerDocSnap.get("profileImagePath");
  let sellerProfilePictureUrl = null;

  if (sellerProfileImagePath) {
    const sellerProfilePictureStorageRef = ref(getStorage(), listing.ownerId);
    sellerProfilePictureUrl = getDownloadURL(sellerProfilePictureStorageRef);
  } else {
    sellerProfilePictureUrl = "/blank.png";
  }

  return {
    props: {
      listing,
      listingImageUrl,
      sellerName,
      sellerProfilePictureUrl,
    },
  };
};

export default ListingPage;
