import React from "react";

import style from "./contributionFooter.css";

const ContributionFooter = () => {
  return (
    <div className="contributionFooterContainer">
      Favicon and images made by{" "}
      <a
        className="contributionLink"
        href="https://www.flaticon.com/authors/freepik"
        target="_blank"
        title="Freepik"
      >
        Freepik
      </a>{" "}
      from{" "}
      <a
        className="contributionLink"
        href="https://www.flaticon.com/"
        target="_blank"
        title="Flaticon"
      >
        www.flaticon.com
      </a>{" "}
      -{" "}
      <a
        className="contributionLink"
        href="https://www.freepik.com"
        target="_blank"
        title="Freepik"
      >
        www.freepik.com
      </a>
    </div>
  );
};

export default ContributionFooter;
