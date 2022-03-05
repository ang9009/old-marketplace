import React, { useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineSearch } from "react-icons/ai";

const Searchbar: React.FC = () => {
  const [query, setQuery] = useState<string>("");

  const router = useRouter();

  return (
    <>
      <input
        type="text"
        placeholder={`Search...`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={async (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            await router.push(`/home/listings/search?q=${query}`);
          }
        }}
      />

      <style jsx>{`
        input {
          background: var(--secondaryBackgroundColor);
          border: none;
          padding: 15px;
          width: 70%;
          height: 70%;
          border-radius: 50px;
          margin-left: 40px;
        }
      `}</style>
    </>
  );
};

export default Searchbar;
