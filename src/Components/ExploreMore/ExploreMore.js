import React from "react";
import { Redirect } from "react-router-dom";

import style from "./exploreMore.css";
import ImageCard from "../Cards/ImageCardWithButton/ImageCard";

const ExploreMore = () => {
  return (
    <div className="exploreMoreContainer">
      <div className="exploreMoreContext">
        <div className="exploreMoreTitle">Explore More...</div>
        <div className="exploreMoreGrid">
          <ImageCard
            image="blog3.jpg"
            title="Blog"
            destination="blog-page"
          ></ImageCard>
          <ImageCard
            image="projects.jpg"
            title="Projects"
            destination="projects"
          ></ImageCard>
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;

/*
<div className="exploreMoreContainer">
      <div className="exploreMoreSeperator">
        <div className="exploreMoreSeperatorLine"></div>
      </div>
      <div className="exploreMoreGrid">
        <div className="exploreMoreGridSection">
          <ImageCard
            image="blog3.jpg"
            title="Blog"
            destination="blog-page"
          ></ImageCard>
        </div>
        <div className="exploreMoreGridSection">
          <ImageCard
            image="projects.jpg"
            title="Projects"
            destination="projects"
          ></ImageCard>
        </div>
      </div>
    </div>

*/
