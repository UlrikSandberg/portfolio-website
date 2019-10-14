import React from "react";
import { Link } from "react-router-dom";
import style from "./imageCard.css";

const ImageCard = props => {
  return (
    <div className="imageCardContainer">
      <Link to={props.destination}>
        <div className="imageCardContext">
          <img className="imageCardBackgroundImage" src={props.image}></img>
          <div className="imageOverlay"></div>
          <div className="imageCardDescription">
            <h3 className="imageCardTitle">{props.title}</h3>
            <div className="imageCardLine"></div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ImageCard;
/*

<div onClick={props.onClick} className="imageCardContainer">
      <div className="imageCardContent">
        <img className="imageCardBackgroundImage" src={props.image}></img>
        <div className="imageOverlay"></div>
        <div className="imageCardDescription">
          <h3 className="imageCardTitle">{props.title}</h3>
          <div className="imageCardLine"></div>
        </div>
      </div>
    </div>

*/
