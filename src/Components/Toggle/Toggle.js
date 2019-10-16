import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import style from "./toggle.css";

const toggleStyles = theme => ({
  button: {
    lineHeight: "30px",
    fontSize: "14px",
    textTransform: "none",
    padding: "10px 50px",
    letterSpacing: "unset",
    marginLeft: "20px",
    marginRight: "20px",
    marginBottom: "auto",
    borderRadius: "40px"
  }
});

const useStyles = makeStyles(toggleStyles);

const Toggle = () => {
  const classes = useStyles();

  const workClicked = () => {
    console.log("Work clicked");
  };

  const personalClicked = () => {
    console.log("personal clicked");
  };

  return (
    <div className="toggleContainer">
      <div>
        <Button onClick={workClicked} className={classes.button}>
          Work
        </Button>
      </div>
      <div>
        <Button onClick={personalClicked} className={classes.button}>
          Personal
        </Button>
      </div>
    </div>
  );
};

export default Toggle;
