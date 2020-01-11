import React from "react";
import P5Wrapper from "../Components/P5/P5Wrapper";
import SeekingSeed from "./P5SeekingBehaviour";

import style from "./steeringBehaviours.css";
import Matrix from "./Physics/Matrix";
import { radiToAngle } from "./Physics/Vector2D";

class SteeringBehaviours extends React.Component {
  constructor(props) {
    super(props);

    let v1 = new Matrix(1, 4);
    let v2 = new Matrix(1, 4);

    v1.randomize();
    v2.randomize();

    console.log(`v1_Length: ${v1.vectorLength()}`);
    console.log(`v2_Length: ${v2.vectorLength()}`);

    console.log(`dotProduct: ${v1.dotProduct(v2)}`);

    // Normalizing
    console.log("normalize");
    v1.normalize();
    v2.normalize();
    console.log(`v1_Length: ${v1.vectorLength()}`);
    console.log(`v2_Length: ${v2.vectorLength()}`);

    console.log(`dotProduct: ${v1.dotProduct(v2)}`);
  }

  render() {
    return (
      <div className="steeringContainer">
        <P5Wrapper seed={SeekingSeed}>{}</P5Wrapper>
      </div>
    );
  }
}

export default SteeringBehaviours;
