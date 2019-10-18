// Framework Essential imports
import React from "react";

import { Button, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
// Style imports
import infoStyle from "./info.css";

// Components imports

const infoStyles = theme => ({
  socialIcon: {
    width: "41px",
    height: "41px",
    fontSize: "30px",
    paddingLeft: "12px",
    paddingRight: "12px",
    minWidth: "41px",
    boxShadow: "none",
    color: "#999999",
    backgroundColor: "transparent",
    marginRight: "5px",
    marginLeft: "5px"
  }
});

const useStyles = makeStyles(infoStyles);

const Info = () => {
  const classes = useStyles();

  return (
    <div className="infoContainer">
      <div>
        <div>
          <img className="profileImage" src="images/commons/ulrik.jpg"></img>
        </div>
        <div className="infoTitles">
          <h3 className="infoTitle">Ulrik Sandberg</h3>
          <h6 className="infoSubTitle">SOFTWARE ENGINEER</h6>
          <div className="socialButtonContainer">
            <Button
              className={classes.socialIcon}
              href="https://github.com/UlrikSandberg?tab=repositories"
              target="_blank"
            >
              <i className={`fab fa-github`} />
            </Button>
            <Button
              className={classes.socialIcon}
              href="https://www.linkedin.com/in/ulrik-sandberg-b2a566143/"
              target="_blank"
            >
              <i className={`fab fa-linkedin`} />
            </Button>
            <Button
              className={classes.socialIcon}
              href="mailto:info.ulriksandberg@gmail.com"
            >
              <i className={`fas fa-at`} />
            </Button>
            <Button
              style={{ display: "none" }}
              className={classes.socialIcon}
              href=""
            >
              <i className={`fas fa-file-contract`} />
            </Button>
          </div>
        </div>
      </div>
      <div className="description">
        <p>
          Hello, I'm 23 years old, born and raised in Denmark. I'm a full-time
          <b> techie</b>, interested in all things software and science. I
          started learning software in 2016, when my brother and I created{" "}
          <Link to="/projects" className="textLink">
            Champagne Moments
          </Link>
          , a social media App for champagne lovers! I have since been studying
          BSc (a fancy word for bachelor) in Software Engineering at the
          University of Southern Denmark from 2017 and is still going strong.{" "}
        </p>
      </div>
      <div className="infoContainerSplitter"></div>
    </div>
  );
};

export default Info;
