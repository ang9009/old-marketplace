import React, { useState, useEffect } from "react";
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { Menu, MenuItem } from "@szhsin/react-menu";
import useGetCurrUser from "../../hooks/useGetCurrUser";

interface Props {
  size: string;
}

const NavbarUserWidget: React.FC<Props> = ({ size }) => {
  const [src, setSrc] = useState<string | null>(null);
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
    }
  }, [userData]);

  return (
    <>
      {userData && (
        <Menu
          menuButton={
            <div className="component-container">
              <img src={src} alt={src} height={size} width={size} />
              <p className="user-name">{userData.name}</p>
            </div>
          }
          transition
          menuStyles={{ marginTop: "10px" }}
          align={"end"}
        >
          <MenuItem onClick={async () => router.push(`/home/profile/available/${userData.id}`)}>
            Profile
          </MenuItem>
          <MenuItem>User settings</MenuItem>
          <MenuItem onClick={async () => router.push("/home/profile/add-listing")}>Add listing</MenuItem>
          <MenuItem onClick={logOut}>
            <span className="sign-out-option">Sign out</span>
          </MenuItem>
        </Menu>
      )}

      <style jsx>{`
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
