import React from "react";

import Navbar from "../../components/ui/Navbar";
import Searchbar from "../../components/widgets/Searchbar";
import Hero from "../../components/ui/Hero";
import RecommendedListings from "../../components/ui/RecommendedListings";

const index: React.FC = () => {
  return (
    <>
      <div className="page-container">
        <Searchbar />
        <Hero />
        <RecommendedListings />
      </div>

      <style jsx>{`
        .page-container {
          margin: 0 auto;
          width: 80vw;
        }
      `}</style>
    </>
  );
};

export default index;
