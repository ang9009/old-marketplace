import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

import getUser from "./getUser";
import Listing from "../types/listing.interface";

export default async function getUserData(userId: string) {
  const db = getFirestore();

  const { userData } = await getUser(userId as string);

  if (userData) {
    const profileImagePath = userData.profileImagePath;

    if (profileImagePath) {
      const url = await getDownloadURL(ref(getStorage(), profileImagePath));

      return {
        userData,
        src: url,
      };
    } else {
      return {
        userData,
        src: "/blank.png",
      };
    }
  }
}
