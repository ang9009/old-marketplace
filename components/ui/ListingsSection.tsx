import React from "react";
import Listing from "../../types/listing.interface";
import { useRouter } from "next/router";

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
                    <div className="tag">Y{listing.yearLevel}</div>
                    <div className="tag">{listing.subject}</div>
                    <div className="tag">{listing.condition}</div>
                  </div>
                  <div className="listing-information-text">
                    <h1 className="listing-name">{listing.name}</h1>
                    <h1 className="listing-price">${listing.price}</h1>
                  </div>
                  <p className="seller">Seller</p>
                </div>
              </div>
            );
          })}
      </section>

      <style jsx>{`
        .tag {
          font-size: 12px;
          background: red;
          display: inline;
          padding: 2px 5px;
        }

        .tag:not(:first-child) {
          margin-left: 5px;
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
          overflow: hidden;
          word-wrap: break-word;
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
