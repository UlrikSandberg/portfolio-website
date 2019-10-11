import React from "react";

import iconStyle from "./common.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { SvgIcon, Button } from "@material-ui/core";

const IconButton = props => {
  return (
    <div className="iconButton">
      <FontAwesomeIcon color="gray" size="sm" icon={faCode}></FontAwesomeIcon>
      <span className="iconSpan"></span>
      {props.children}
    </div>
  );
};

export default IconButton;
