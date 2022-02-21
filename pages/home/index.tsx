import React from "react";
import useAuth from "../../hooks/useAuth";
import Navbar from "../../components/ui/Navbar";
import Searchbar from "../../components/widgets/Searchbar";
import Hero from "../../components/ui/Hero";
import RecommendedListings from "../../components/ui/RecommendedListings";

const index: React.FC = () => {
  useAuth();
  //
  return (
    <>
      <div>
        <Searchbar />
        <Hero />
        <RecommendedListings />
      </div>

      <style jsx>{`
        div {
          margin: 0 auto;
          width: 80vw;
        }
      `}</style>
    </>
  );
};

export default index;
