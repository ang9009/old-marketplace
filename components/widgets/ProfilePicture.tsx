import React, { useState, useEffect, useContext } from "react";
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import { doc, DocumentSnapshot, getDoc, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface Props {
  size: string;
}

const ProfilePicture: React.FC<Props> = ({ size }) => {
  const [src, setSrc] = useState<string | null>(null);
  const [docSnap, setDocSnap] = useState<DocumentSnapshot>(null);

  useEffect(() => {
    onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        const db = getFirestore();
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((docSnap) => {
          setDocSnap(docSnap);
        });
      }
    });
  }, []);

  useEffect(() => {
    if (docSnap) {
      const profileImagePath = docSnap.get("profileImagePath");

      if (profileImagePath) {
        getDownloadURL(ref(getStorage(), profileImagePath)).then((url) => {
          setSrc(url);
        });
      } else {
        setSrc("/blank.png");
      }
    }
  }, [docSnap]);

  return (
    <>
      <img src={src} alt={src} height={size} width={size} />

      <style jsx>{`
        img {
          object-fit: cover;
          border-radius: 50%;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default ProfilePicture;
