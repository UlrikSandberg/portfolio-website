import React from "react";

import style from "./blogPostPreviewCard.css";

import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const blogPostPreviewCardMuiStyles = theme => ({
  button: {
    lineHeight: "30px",
    fontSize: "14px",
    textTransform: "none",
    backgroundColor: "#00acc4",
    padding: "5px 50px",
    letterSpacing: "unset",
    marginLeft: "1px",
    marginRight: "1px",
    marginTop: "30px",
    marginBottom: "auto",
    borderRadius: "40px",
    color: "white",
    boxShadow:
      "0 2px 2px 0 rgba(0, 172, 193, 0.14), 0 3px 1px -2px rgba(0, 172, 193, 0.2), 0 1px 5px 0 rgba(0, 172, 193, 0.12)",
    "&:hover": {
      backgroundColor: "#00acc4"
    }
  }
});

const styles = makeStyles(blogPostPreviewCardMuiStyles);

const BlogPostPreviewCard = props => {
  const classes = styles();

  return (
    <div className="blogPostPreviewCardContainer">
      <img
        src={props.thumbnail}
        alt="blog post thumbnail"
        className="blogPostPreviewCardImageBackground"
      ></img>
      <div className="blogPostPreviewCardOverlay"></div>
      <div className="blogPostPreviewCardHeader"></div>
      <div className="blogPostPreviewCardTextContainer">
        <h3
          onClick={() => props.onClick(props.id)}
          className="blogPostPreviewCardTitle"
        >
          {props.title}
        </h3>
        <p className="blogPostPreviewCardDescription">{props.description}</p>
        <Button
          onClick={() => props.onClick(props.id)}
          className={classes.button}
        >
          Read
        </Button>
      </div>
      <div className="blogPostPreviewCardFooter">
        <div className="blogPostPreviewCardTimeStamp">{props.timeStamp}</div>
        <div className="blogPostPreviewCardCategories">{props.categories}</div>
      </div>
    </div>
  );
};

export default BlogPostPreviewCard;

/*

<div
      className="blogPostPreviewCardContainer"
      style={{ backgroundImage: "url(/blog3.jpg)" }}
    >
      <div className="blogPostPreviewCardContent">
        <div className="blogPostPreviewCardTextContainer">
          <h3 className="blogPostPreviewCardTitle">
            Create a Perceptron from scratch in Pythton!
          </h3>
          <p className="blogPostPreviewCardDescription">
            A perceptron is in many ways the "Hello World" of Neural Networks.
            Learn the basics and fundementals of AI!
          </p>
          <Button className={classes.button}>Read</Button>
        </div>
        <div className="blogPostPreviewCardFooter">
          <div className="blogPostPreviewCardTimeStamp">6 Apr 2013</div>
          <div className="blogPostPreviewCardCategories">AI, Python</div>
        </div>
      </div>
    </div>*/
