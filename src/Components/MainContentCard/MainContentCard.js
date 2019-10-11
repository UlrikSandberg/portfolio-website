import React from "react";

import Style from "./mainContentCard.css";

const MainContentCard = props => {
  return (
    <div className="mainContentCard">
      <div className="container">{props.children}</div>
    </div>
  );
};

export default MainContentCard;
