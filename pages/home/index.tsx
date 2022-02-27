import React from "react";

import Searchbar from "../../components/widgets/Searchbar";
import Hero from "../../components/ui/Hero";
import RecommendedListings from "../../components/ui/RecommendedListings";

const Index: React.FC = () => {
  return (
    <>
      <div className="page-container">
        <Searchbar />
        <Hero />
        <h1 className="heading">Recommended for you</h1>
        <RecommendedListings />
      </div>

      <style jsx>{`
        .page-container {
          margin: 0 auto;
          width: 80vw;
        }

        .heading {
          margin: 35px 0;
          width: 100%;
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default Index;
