import React from "react";
import Zoom from "react-medium-image-zoom";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { GetServerSideProps } from "next";
import Listing from "../../../types/listing.interface";

import capitalise from "../../../utils/capitalise";
import Condition from "../../../types/condition.enum";

interface Props {
  listing: Listing;
  imageUrl: string;
}

const ListingPage: React.FC<Props> = ({ listing, imageUrl }) => {
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
          <Zoom wrapStyle={{ width: "100%" }}>
            <img src={imageUrl} alt="" className="listing-image" />
          </Zoom>
        </div>

        <section className="listing-information-container">
          <div className="listing-content-container">
            <div className="listing-tags">
              <div className="year-level-tag tag">Y{listing.yearLevel}</div>
              {listing.subject && <div className="subject-tag tag">{listing.subject}</div>}
              <div
                className="condition-tag tag"
                style={{ background: getConditionTagColor(listing.condition) }}
              >
                {capitalise(listing.condition)}
              </div>
              <div className="type-tag tag">{capitalise(listing.type)}</div>
            </div>
            <h1 className="listing-name">{listing.name}</h1>
            <h1 className="listing-price">${listing.price}</h1>
            <p className="listing-description">{listing.description}</p>
          </div>

          <div className="listing-actions-container"></div>
        </section>
      </div>

      <style jsx>{`
        .page-container {
          padding-top: 40px;
        }

        .listing-tags {
          display: flex;
        }

        .tag {
          margin-right: 10px;
          padding: 3px 5px;
          color: #fff;
        }

        .year-level-tag {
          background: #b743ed;
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
        }

        .listing-content-container {
          margin-top: 40px;
        }

        .listing-image {
          width: 100%;
          height: 400px;
          object-fit: contain;
        }
      `}</style>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const listingId = context.query.listingId as string;

  const db = getFirestore();

  const docRef = doc(db, "listings", listingId);

  const docSnap = await getDoc(docRef);

  const listing: Listing = {
    id: docSnap.get("id"),
    ownerId: docSnap.get("ownerId"),
    buyerId: docSnap.get("buyerId"),
    name: docSnap.get("name"),
    description: docSnap.get("description"),
    condition: docSnap.get("condition"),
    state: docSnap.get("state"),
    type: docSnap.get("type"),
    yearLevel: docSnap.get("yearLevel"),
    subject: docSnap.get("subject"),
    price: docSnap.get("price"),
    imagePath: docSnap.get("imagePath"),
  };

  const storageRef = ref(getStorage(), listingId);
  const imageUrl = await getDownloadURL(storageRef);

  return {
    props: {
      listing,
      imageUrl,
    },
  };
};

export default ListingPage;
