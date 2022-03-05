import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { collection, doc, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import Zoom from "react-medium-image-zoom";
import { BiLinkExternal } from "react-icons/bi";
import { GetServerSideProps } from "next";

import Listing from "../../../types/listing.interface";
import User from "../../../types/user.interface";
import ListingState from "../../../types/listingState.enum";
import capitalise from "../../../utils/capitalise";
import PrimaryButton from "../../../components/widgets/PrimaryButton";
import useGetCurrUser from "../../../hooks/useGetCurrUser";
import getConditionTagColor from "../../../utils/getConditionTagColor";
import getListingAndUserDocs from "../../../utils/getListingAndUserDocs";
import { useRouter } from "next/router";
import useUpdateListingState from "../../../hooks/useUpdateListingState";

interface Props {
  listing: Listing;
  listingImageUrl: string;
  seller: User;
  sellerProfilePictureUrl: string;
}

const ListingPage: React.FC<Props> = ({ listing, listingImageUrl, seller, sellerProfilePictureUrl }) => {
  const [updatedListing, setUpdatedListing] = useState(listing);
  const router = useRouter();
  const db = getFirestore();

  const { authUser, isLoading: isUserLoading } = useGetCurrUser();
  const { updateListingState } = useUpdateListingState({ updatedListing, authUser });

  useEffect(() => {
    const docRef = doc(db, "listings", listing.id);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      setUpdatedListing(docSnap.data() as Listing);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const goToSellerProfile = () => {
    window.open(`/home/profile/available/${seller.id}`, "_blank");
  };

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
              <div className="year-level-tag tag">Y{updatedListing.yearLevel}</div>
              {updatedListing.subject && <div className="subject-tag tag">{updatedListing.subject}</div>}
              <div className="type-tag tag">{capitalise(updatedListing.type)}</div>
              <div
                className="condition-tag tag"
                style={{ background: getConditionTagColor(listing.condition) }}
              >
                {capitalise(updatedListing.condition)}
              </div>
            </div>
            <p className="listing-name">{updatedListing.name}</p>
            <h1 className="listing-price">${updatedListing.price}</h1>
            <div className="divider" />
            <h1>Description</h1>
            <p className="listing-description">{updatedListing.description}</p>
          </div>

          {isUserLoading ? (
            <div className="listing-actions-container">
              <div>
                <Skeleton height={30} width={250} />
                <Skeleton height={30} style={{ marginTop: "15px" }} />
                <Skeleton height={30} style={{ marginTop: "15px" }} />
              </div>
            </div>
          ) : authUser && authUser.uid === updatedListing.ownerId ? (
            <div className="listing-actions-container">
              <h1>You own this listing!</h1>
              <PrimaryButton
                text={"Edit listing"}
                width={"100%"}
                mt={"15px"}
                color={"#000"}
                background={"none"}
                onClick={async () => router.push(`/home/listings/edit-listing/${listing.id}`)}
                border={"1px solid var(--primaryBorderColor)"}
              />
              <PrimaryButton text={"Mark as sold"} width={"100%"} mt={"15px"} />
            </div>
          ) : (
            <div className="listing-actions-container">
              <h1>Meet the seller</h1>
              <div className="seller-info-container">
                <img src={sellerProfilePictureUrl} alt="" className="seller-profile-picture" />
                <h1 className="seller-name">{seller.name}</h1>
                <a className="seller-profile-link" target="_blank" onClick={goToSellerProfile}>
                  <BiLinkExternal size={15} />
                </a>
              </div>
              <PrimaryButton
                text={
                  updatedListing.state !== "available"
                    ? authUser && updatedListing.buyerId === authUser.uid
                      ? "Cancel reservation"
                      : "Unavailable"
                    : "Reserve listing"
                }
                width={"100%"}
                onClick={updateListingState}
                disabled={
                  updatedListing.state === ListingState.RESERVED &&
                  authUser &&
                  updatedListing.buyerId !== authUser.uid
                }
                background={
                  updatedListing.state !== "available"
                    ? "var(--secondaryButtonColor)"
                    : "var(--primaryButtonColor)"
                }
              />
            </div>
          )}
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
          margin-top: 5px;
          color: var(--secondaryTextColor);
          width: 100%;
          word-break: break-all;
          white-space: normal;
          line-height: 30px;
        }

        .listing-tags {
          display: flex;
        }

        .listing-price {
          margin-top: 5px;
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
          width: 100%;
          border-radius: 12px;
          border: 1px solid var(--primaryBorderColor);
          box-sizing: initial;
        }

        .listing-content-container {
          width: 70%;
        }

        .listing-image {
          height: 400px;
          width: 100%;
          object-fit: contain;
        }

        .listing-name {
          font-size: 20px;
          font-weight: 500;
          margin-top: 15px;
          width: 100%;
          word-break: break-all;
          white-space: normal;
          line-height: 30px;
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
          height: 30px;
          object-fit: cover;
          border-radius: 50%;
        }

        .seller-profile-link {
          color: #a5a5a5;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const listingId = context.query.listingId;

  const { listing, listingImageUrl, seller, sellerProfilePictureUrl } = await getListingAndUserDocs(
    listingId as string
  );

  return {
    props: {
      listing,
      listingImageUrl,
      seller,
      sellerProfilePictureUrl,
    },
  };
};

export default ListingPage;
