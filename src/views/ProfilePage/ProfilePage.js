import React from "react";

import P5Wrapper from "../../Components/P5/P5Wrapper";
import seed from "../../Components/P5/DynamicBG";
import Header from "../../Components/Header/Header";
import SectionSeperator from "../../Components/SectionSeperator/SectionSeperator";
import Info from "../../Components/Info/Info";
import MainContentCard from "../../Components/MainContentCard/MainContentCard";
import TechnicalInfo from "../../Components/Info/TechnicalInfo";

import ThreeCanvas from "../../Components/Three/ThreeCanvas";

const ProfilePage = () => {
  return (
    <div>
      <Header></Header>
      <div className="headerContainer">
        <P5Wrapper seed={seed} />
        <SectionSeperator></SectionSeperator>
      </div>
      <MainContentCard>
        <Info></Info>
        <TechnicalInfo></TechnicalInfo>
      </MainContentCard>
    </div>
  );
};

export default ProfilePage;
