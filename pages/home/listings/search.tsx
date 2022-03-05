import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import ListingsSection from "../../../components/ui/ListingsSection";
import Listing from "../../../types/listing.interface";
import algolia from "../../../lib/algolia";
import Searchbar from "../../../components/widgets/Searchbar";

interface Props {
  listings: Listing[];
}

const search: React.FC<Props> = ({ listings }) => {
  const router = useRouter();
  const query = router.query.q;

  return (
    <>
      <div className="page-container">
        <Searchbar />
        <h1 className="returned-text">
          "{query}" returned {listings.length} result{listings.length === 1 ? "" : "s"}
        </h1>
        <ListingsSection listings={listings} />
      </div>

      <style jsx>{`
        .page-container {
          padding-top: 80px;
        }

        .returned-text {
          margin-top: 30px;
        }
      `}</style>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.q as string;

  const index = algolia.initIndex("listings");

  index.setSettings({ searchableAttributes: ["name", "description"] });

  const { hits: listings } = await index.search<Listing[]>(query);

  return {
    props: {
      listings,
    },
  };
};

export default search;
