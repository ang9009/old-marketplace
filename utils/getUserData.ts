import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

import getUser from "./getUser";
import Listing from "../types/listing.interface";

export default async function getUserData(userId: string) {
  const db = getFirestore();

  const { userData } = await getUser(userId as string);

  if (userData) {
    const profileImagePath = userData.profileImagePath;

    let userListings: Listing[] = [];
    const q = query(
      collection(db, "listings"),
      where("ownerId", "==", userId),
      where("state", "==", "available")
    );
    const listingQuerySnapshot = await getDocs(q);
    if (listingQuerySnapshot) {
      listingQuerySnapshot.forEach((doc) => {
        userListings.push(doc.data() as Listing);
      });
    }

    if (profileImagePath) {
      const url = await getDownloadURL(ref(getStorage(), profileImagePath));

      return {
        userData,
        userListings,
        src: url,
      };
    } else {
      return {
        userData,
        userListings,
        src: "/blank.png",
      };
    }
  }
}
