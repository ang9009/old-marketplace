import React from "react";

import { GetServerSideProps } from "next";
import Listing from "../../../../types/listing.interface";
import ProfileTopSection from "../../../../components/ui/ProfileTopSection";
import ListingsSection from "../../../../components/ui/ListingsSection";
import getUser from "../../../../utils/getUser";
import User from "../../../../types/user.interface";
import getUserData from "../../../../utils/getUserData";

interface Props {
  userData: User;
  userListings: Listing[] | null;
  src: string;
}

const Index: React.FC<Props> = ({ userData, userListings, src }) => {
  return (
    <>
      <div className="page-container">
        <ProfileTopSection userData={userData} src={src} />
        <ListingsSection listings={userListings} />
      </div>

      <style jsx>{`
        .page-container {
          padding-top: 80px;
        }
      `}</style>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.query.userId;
  const { userData, userListings, src } = await getUserData(userId as string);

  return { props: { userData, userListings, src } };
};

export default Index;
