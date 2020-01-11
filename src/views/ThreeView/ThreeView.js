import React from "react";

import ThreeCanvas from "../../Components/Three/ThreeCanvas";
import ThreeCanvas2 from "../../Components/Three/PerlinNoiseTerrain";

import styles from "./threeView.css";

const ThreeView = () => {
  return (
    <div className="threeContainer">
      <ThreeCanvas2 />
    </div>
  );
};

export default ThreeView;
