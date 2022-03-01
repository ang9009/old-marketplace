import { getDownloadURL, getStorage, ref } from "firebase/storage";

import getUser from "./getUser";

export default async function getUserSrc(userId: string) {
  const { userData } = await getUser(userId as string);

  if (userData) {
    const profileImagePath = userData.profileImagePath;

    if (profileImagePath) {
      const url = await getDownloadURL(ref(getStorage(), profileImagePath));
      return url;
    } else {
      return "/blank.png";
    }
  }
}
