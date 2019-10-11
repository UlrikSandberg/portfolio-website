import React from "react";

import Header from "../../Components/Header/Header";
import P5Wrapper from "../../Components/P5/P5Wrapper";
import seed from "../../Components/P5/DynamicBG";
import SectionSeperator from "../../Components/SectionSeperator/SectionSeperator";
import MainContentCard from "../../Components/MainContentCard/MainContentCard";

const ProjectsPage = () => {
  return (
    <div>
      <Header highligthedIndex="2"></Header>
      <div className="headerContainer">
        <P5Wrapper seed={seed} />
        <SectionSeperator></SectionSeperator>
      </div>
      <MainContentCard>
        <h3 className="infoTitle">Projects</h3>
      </MainContentCard>
    </div>
  );
};

export default ProjectsPage;
