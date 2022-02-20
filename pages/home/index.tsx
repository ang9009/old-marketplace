import React, { useContext, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import ProfilePicture from "../../components/widgets/ProfilePicture";
import { FirebaseContext } from "../../components/context/FirebaseContext";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore/lite";
// import { getDatabase, ref, onValue } from "firebase/database";

const index: React.FC = () => {
  useAuth();
  const { app } = useContext(FirebaseContext);

  useEffect(() => {
    // const currUser = auth.currentUser;

    if (app) {
      const db = getFirestore(app);
      const docRef = doc(db, "users");
      getDoc(docRef).then((docSnap) => {
        console.log(docSnap);
      });
    }
  }, [app]);

  const getData = async (db) => {
    const docRef =
  };

  return (
    <>
      <ProfilePicture imagePath={""} width={"30px"} height={"30px"} />
      <h1>deez nuts hah gottem</h1>
    </>
  );
};

export default index;
