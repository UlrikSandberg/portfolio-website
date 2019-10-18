import React from "react";

import style from "./technicalInfo.css";

class TechnicalInfo extends React.Component {
  render() {
    return (
      <div className="technicalInfoContainer">
        <div className="technicalDescriptionContainer">
          <h3 className="technicalInfoTitle">I Speak Different Languages</h3>
          <br></br>
          <div className="technicalDescription">
            I have primarily been developing within the - C#, .Net Core,
            Xamarin.Forms world. However, I <b>speak</b> other languages too!
            Fx. <b>Java</b>, <b>Python</b> and <b>JavaScript</b>.<br></br>
            <br></br>I have also picked up interests within the world of A.I.,
            Math, Autonomous systems, Datastructures {`&`} Algorithms, 3D/2D
            modelling and I am keen to learn a lot more within System
            Architecture, DEVOPS, Web, Robotics, Embedded systems and much, much
            more.
          </div>
        </div>
        <div className="cubeContainer">
          <div className="cube">
            <div className="front-side">
              <img
                className="cubeLogo"
                src="/images/codeLogos/pythonLogo.png"
                alt="pythonLogo"
              ></img>
            </div>
            <div className="back-side">
              <img
                className="cubeLogo"
                src="/images/codeLogos/javaScriptLogo.png"
                alt="javaScriptLogo"
              ></img>
            </div>
            <div className="left-side">
              <img
                className="cubeLogo"
                src="/images/codeLogos/javaLogo.png"
                alt="javaLogo"
              ></img>
            </div>
            <div className="right-side">
              <img
                className="cubeLogo"
                src="/images/codeLogos/cSharpLogo.png"
                alt="cSharpLogo"
              ></img>
            </div>
            <div className="top-side"></div>
            <div className="bottom-side"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default TechnicalInfo;
