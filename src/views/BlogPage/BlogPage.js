import React from "react";

import Header from "../../Components/Header/Header";
import MainContentCard from "../../Components/MainContentCard/MainContentCard";
import P5Wrapper from "../../Components/P5/P5Wrapper";
import seed from "../../Components/P5/DynamicBG";
import SectionSeperator from "../../Components/SectionSeperator/SectionSeperator";
import ThreeCanvas from "../../Components/Three/ThreeCanvas";
import BlogPostPreviewCard from "../../Components/Cards/BlogPostPreviewCard/BlogPostPreviewCard";
import Footer from "../../Components/Footer/Footer";

import style from "./blogPage.css";

const BlogPage = () => {
  return (
    <div>
      <Header highligthedIndex="1"></Header>
      <div className="headerContainer">
        <P5Wrapper seed={seed} />
        <SectionSeperator></SectionSeperator>
      </div>
      <MainContentCard>
        <BlogPostPreviewCard></BlogPostPreviewCard>
      </MainContentCard>
      <Footer></Footer>
    </div>
  );
};

export default BlogPage;
