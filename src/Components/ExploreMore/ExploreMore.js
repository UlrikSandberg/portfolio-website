import React from "react";

import style from "./exploreMore.css";
import ImageCard from "../Cards/ImageCardWithButton/ImageCard";

const ExploreMore = () => {
  return (
    <div className="exploreMoreContainer">
      <div className="exploreMoreContext">
        <div className="exploreMoreTitle">Explore More...</div>
        <div className="exploreMoreGrid">
          <ImageCard
            image="/images/commons/blogExploreMore.jpg"
            title="Blog"
            destination="blog-page"
          ></ImageCard>
          <ImageCard
            image="/images/commons/projectExploreMore.jpg"
            title="Projects"
            destination="projects"
          ></ImageCard>
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
