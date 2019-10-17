import React from "react";

import P5Wrapper from "../../Components/P5/P5Wrapper";
import seed from "../../Components/P5/DynamicBG";
import Header from "../../Components/Header/Header";
import SectionSeperator from "../../Components/SectionSeperator/SectionSeperator";
import Info from "../../Components/Info/Info";
import MainContentCard from "../../Components/MainContentCard/MainContentCard";
import TechnicalInfo from "../../Components/Info/TechnicalInfo";
import Terminal from "../../Components/Terminal/Terminal";
import ExploreMore from "../../Components/ExploreMore/ExploreMore";
import Footer from "../../Components/Footer/Footer";

import ThreeCanvas from "../../Components/Three/ThreeCanvas";

const ProfilePage = () => {
  return (
    <div>
      <Header scrollHeight="0.25"></Header>
      <div className="headerContainer">
        <P5Wrapper
          seed={seed}
          linearBackground={`linear-gradient(to bottom right, #000000a6, #029195)`}
        />
        <SectionSeperator></SectionSeperator>
      </div>
      <MainContentCard>
        <Info></Info>
        <TechnicalInfo></TechnicalInfo>
        <Terminal></Terminal>
      </MainContentCard>

      <ExploreMore></ExploreMore>
      <Footer></Footer>
    </div>
  );
};

export default ProfilePage;
