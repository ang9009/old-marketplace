import React from "react";
import Listing from "../../types/listing.interface";
import { useRouter } from "next/router";
import capitalise from "../../utils/capitalise";
import { GetServerSideProps } from "next";
import getUser from "../../utils/getUser";
import getConditionTagColor from "../../utils/getConditionTagColor";

interface Props {
  listings: Listing[];
}

const ListingsSection: React.FC<Props> = ({ listings }) => {
  const router = useRouter();

  return (
    <>
      <section>
        {listings &&
          listings.map((listing) => {
            return (
              <div className="listing-card" onClick={async () => router.push(`/home/listings/${listing.id}`)}>
                <img src="/cis.jpg" alt="Image not available" className="listing-image" />
                <div className="listing-information">
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
                  <div className="listing-information-text">
                    <h1 className="listing-name">{listing.name}</h1>
                    <h1 className="listing-price">${listing.price}</h1>
                  </div>
                  <p className="seller">Seller name</p>
                </div>
              </div>
            );
          })}
      </section>

      <style jsx>{`
        .tag {
          font-size: 10px;
          display: inline;
          padding: 2px 5px;
          margin-right: 5px;
          font-weight: 800;
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
          box-shadow: 0 8px 8px rgba(95, 93, 93, 0.25);
          transform: translateY(-1px);
        }

        .listing-image {
          width: 100%;
          height: 70%;
          border-radius: 12px;
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
          margin-right: 3px;
        }

        .listing-information-text {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        }

        .listing-price {
          color: var(--secondaryTextColor);
        }

        .heading {
          text-align: center;
        }

        .seller {
          color: var(--secondaryTextColor);
        }
      `}</style>
    </>
  );
};

export default ListingsSection;
