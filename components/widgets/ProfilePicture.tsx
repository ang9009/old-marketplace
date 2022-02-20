import React, { useState, useEffect, useContext } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { FirebaseContext } from "../context/FirebaseContext";

interface Props {
  imagePath: string;
  width: string;
  height: string;
}

const ProfilePicture: React.FC<Props> = ({ imagePath, width, height }) => {
  const [src, setSrc] = useState<string | null>(null);
  const { storage } = useContext(FirebaseContext);

  useEffect(() => {
    if (imagePath) {
      getDownloadURL(ref(storage, imagePath)).then((url) => {
        setSrc(url);
      });
    }
  }, [imagePath]);

  return (
    <>{src && <img src={src} alt={src} width={width} height={height} />}</>
  );
};

export default ProfilePicture;
