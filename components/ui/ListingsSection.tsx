import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Listing from "../../types/listing.interface";
import capitalise from "../../utils/capitalise";
import getConditionTagColor from "../../utils/getConditionTagColor";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import Skeleton from "react-loading-skeleton";
import getUser from "../../utils/getUser";

interface Props {
  listings: Listing[];
}

const ListingsSection: React.FC<Props> = ({ listings }) => {
  const router = useRouter();
  const [listingImgUrls, setListingImgUrls] = useState(null);
  const [listingOwnerNames, setListingOwnerNames] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const listingImgUrls = listings.map(async (listing) => {
      return getDownloadURL(ref(getStorage(), listing.id));
    });

    Promise.all(listingImgUrls).then((urls) => {
      setListingImgUrls(urls);

      const ownerNames = listings.map(async (listing) => {
        const { userData } = await getUser(listing.ownerId);
        return userData.name;
      });

      Promise.all(ownerNames).then((ownerNames) => {
        setListingOwnerNames(ownerNames);
        setIsLoading(false);
      });
    });
  }, [listings]);

  return (
    <>
      <section>
        {listings.map((listing, i) => {
          return (
            <div
              className="listing-card"
              key={listing.id}
              onClick={async () => router.push(`/home/listings/${listing.id}`)}
            >
              {isLoading ? (
                <Skeleton count={1} height={245} borderRadius={12} />
              ) : (
                <div className="image-container">
                  {listing.state === "reserved" && (
                    <div>
                      <p className="reserved-text">RESERVED</p>
                      <div className="reserved-overlay"></div>
                    </div>
                  )}
                  <img src={listingImgUrls[i]} alt="Image not available" className="listing-image" />
                </div>
              )}
              <div className="listing-information">
                {isLoading ? (
                  <Skeleton count={1} height={17.5} borderRadius={0} />
                ) : (
                  <div className="tags-container">
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
                )}
                {isLoading ? (
                  <Skeleton count={1} height={24} borderRadius={0} />
                ) : (
                  <div className="listing-information-text">
                    <h1 className="listing-name">{listing.name}</h1>
                    <h1 className="listing-price">${listing.price}</h1>
                  </div>
                )}
                {isLoading ? (
                  <Skeleton count={1} height={22} borderRadius={0} />
                ) : (
                  <p className="seller">{listingOwnerNames[i]}</p>
                )}
              </div>
            </div>
          );
        })}
      </section>

      <style jsx>{`
        .tag {
          font-size: 9px;
          display: inline;
          padding: 2px 5px;
          margin-right: 5px;
          font-weight: 800;
          color: #fff;
        }

        .image-container {
          position: relative;
          width: 100%;
          height: 245px;
        }

        .listing-image {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          border-radius: 12px;
          object-fit: cover;
        }

        .reserved-overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 12px;
          top: 0;
          left: 0;
          z-index: 2;
          opacity: 0.6;
          background: black;
        }

        .reserved-text {
          position: absolute;
          z-index: 3;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-weight: bold;
          font-size: 15px;
          color: #fff;
          background: #3f6ce0;
          padding: 5px 10px;
          border-radius: 8px;
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

        .tags-container {
          margin-bottom: 5px;
        }

        section {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 350px;
          grid-row-gap: 40px;
          grid-column-gap: 30px;
          width: 100%;
          margin-top: 20px;
        }

        .listing-card {
          width: 100%;
          height: 100%;
          background: var(--primaryBackgroundColor);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          cursor: pointer;
          transition: 0.2s all;
        }

        .listing-card:hover {
          box-shadow: var(--secondaryBoxShadow);
          transform: translateY(-3px);
        }

        .listing-information {
          padding: 15px;
          width: 100%;
          height: 30%;
          background: var(--primaryBackgroundColor);
        }

        .listing-name {
          white-space: nowrap;
          word-wrap: break-word;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .listing-information-text {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        }

        .listing-price {
          color: var(--secondaryTextColor);
          text-overflow: ellipsis;
        }

        .heading {
          text-align: center;
        }

        .seller {
          color: var(--secondaryTextColor);
          font-size: 15px;
        }
      `}</style>
    </>
  );
};

export default ListingsSection;
