import React, { useState, useEffect, useContext } from "react";
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import { doc, DocumentSnapshot, getDoc, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import Link from "next/link";

interface Props {
  size: string;
}

const ProfilePicture: React.FC<Props> = ({ size }) => {
  const [src, setSrc] = useState<string | null>(null);
  const [docSnap, setDocSnap] = useState<DocumentSnapshot>(null);
  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore();

  const logOut = () => {
    signOut(auth)
      .then(async () => {
        await router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
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
      <Menu menuButton={<img src={src} alt={src} height={size} width={size} />} transition align={"end"}>
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={async () => router.push("/home/my-listings")}>My listings</MenuItem>
        <MenuItem onClick={async () => router.push("/home/my-listings/add-listing")}>Add listing</MenuItem>
        <MenuItem onClick={logOut}>
          <span className="sign-out-option">Sign out</span>
        </MenuItem>
      </Menu>

      <style jsx>{`
        img {
          object-fit: cover;
          border-radius: 50%;
          cursor: pointer;
        }

        .sign-out-option {
          color: red;
        }
      `}</style>
    </>
  );
};

export default ProfilePicture;
