import React from "react";
import { GetServerSideProps } from "next";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

import getListing from "../../../../utils/getListing";
import getUser from "../../../../utils/getUser";
import User from "../../../../types/user.interface";

interface Props {
  userData: User;
  userImgUrl: string;
}

const userSettingsPage: React.FC<Props> = ({ userData, userImgUrl }) => {
  return (
    <>
      <div className="page-container">
        <h1>{userData.name}</h1>
        <p>Unfinished sorry</p>
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
  const userId = context.query.userId as string;
  const { userData } = await getUser(userId);
  const userImgUrl = await getDownloadURL(ref(getStorage(), userId));

  return { props: { userData, userImgUrl } };
};

export default userSettingsPage;
