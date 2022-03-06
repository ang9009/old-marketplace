import React, { useState, useEffect } from "react";
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";

import { Menu, MenuItem } from "@szhsin/react-menu";
import useGetCurrUser from "../../hooks/useGetCurrUser";
import Skeleton from "react-loading-skeleton";

interface Props {
  size: string;
}

const NavbarUserWidget: React.FC<Props> = ({ size }) => {
  const [src, setSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useGetCurrUser();
  const router = useRouter();
  const auth = getAuth();

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
    if (userData) {
      const profileImagePath = userData.profileImagePath;

      if (profileImagePath) {
        getDownloadURL(ref(getStorage(), profileImagePath)).then((url) => {
          setSrc(url);
        });
      } else {
        setSrc("/blank.png");
      }

      setIsLoading(false);
    }
  }, [userData]);

  return (
    <>
      {isLoading ? (
        <div className="skeleton-container">
          <Skeleton count={1} height={35} width={35} circle={true} />
          <Skeleton count={1} height={22} width={60} borderRadius={0} style={{ marginLeft: "10px" }} />
        </div>
      ) : (
        <Menu
          menuButton={
            <div className="component-container">
              <img src={src} alt={src} height={size} width={size} />
              <p className="user-name">{userData?.name}</p>
            </div>
          }
          transition
          menuStyles={{ marginTop: "10px" }}
          align={"end"}
        >
          <MenuItem onClick={async () => router.push(`/home/profile/available/${userData.id}`)}>
            Profile
          </MenuItem>
          <MenuItem onClick={async () => router.push(`/home/profile/user-settings/${userData.id}`)}>
            User settings
          </MenuItem>
          <MenuItem onClick={async () => router.push("/home/profile/add-listing")}>Add listing</MenuItem>
          <MenuItem onClick={logOut}>
            <span className="sign-out-option">Sign out</span>
          </MenuItem>
        </Menu>
      )}

      <style jsx>{`
        .skeleton-container {
          display: flex;
          align-items: center;
          width: min-content;
        }

        .component-container {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .user-name {
          margin-left: 10px;
          font-weight: bold;
        }

        img {
          object-fit: cover;
          border-radius: 50%;
        }

        .sign-out-option {
          color: red;
        }
      `}</style>
    </>
  );
};

export default NavbarUserWidget;
