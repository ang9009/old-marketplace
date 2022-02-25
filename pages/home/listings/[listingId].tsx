import React, { useEffect, useState, useRef } from "react";
import Zoom from "react-medium-image-zoom";
import { useRouter } from "next/router";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { doc, DocumentSnapshot, getDoc, getFirestore } from "firebase/firestore";

const ListingPage: React.FC = () => {
  const [src, setSrc] = useState<string | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [listingDocSnap, setListingDocSnap] = useState<DocumentSnapshot>();

  const router = useRouter();
  const listingId = router.query.listingId as string;
  const db = getFirestore();

  useEffect(() => {
    if (listingId) {
      const storageRef = ref(getStorage(), listingId);
      getDownloadURL(storageRef).then((url) => {
        setSrc(url);
      });

      const docRef = doc(db, "listings", listingId);
      getDoc(docRef).then((docSnap) => {
        setListingDocSnap(docSnap);
      });
    }
  }, [listingId]);

  return (
    <>
      <div className="page-container">
        {src && (
          <div className="listing-image-container" style={{ display: isImageLoaded ? "block" : "none" }}>
            <Zoom wrapStyle={{ width: "100%" }}>
              <img src={src} alt="" onLoad={() => setIsImageLoaded(true)} className="listing-image" />
            </Zoom>
          </div>
        )}

        <div className="listing-content-container">
          <div className="listing-tags">
            <div className="year-level-tag"></div>
            <div className="subject-tag"></div>
            <div className="condition-tag"></div>
          </div>
          <h1 className="listing-name"></h1>
          <h1 className="listing-price"></h1>
          <p className="listing-description"></p>
          <p>{listingId}</p>
        </div>

        <div className="listing-actions-container"></div>
      </div>

      <style jsx>{`
        .page-container {
          padding-top: 40px;
        }

        .listing-image-container {
          display: grid;
          place-items: center;
          height: 400px;
          background: #000;
          border-radius: 12px;
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

export default ListingPage;
