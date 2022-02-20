import React, { useState, useEffect, useContext } from "react";
import { getDownloadURL, ref, getStorage } from "firebase/storage";

interface Props {
  imagePath: string;
  width: string;
  height: string;
}

const ProfilePicture: React.FC<Props> = ({ imagePath, width, height }) => {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (imagePath) {
      getDownloadURL(ref(getStorage(), imagePath)).then((url) => {
        setSrc(url);
      });
    }
  }, [imagePath]);

  return <>{src && <img src={src} alt={src} width={width} height={height} />}</>;
};

export default ProfilePicture;
