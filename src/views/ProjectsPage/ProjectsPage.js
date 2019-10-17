import React from "react";
import { Link } from "react-router-dom";
import style from "./projectsPage.css";

import Header from "../../Components/Header/Header";
import P5Wrapper from "../../Components/P5/P5Wrapper";
import seed from "../../Components/P5/DynamicBG";
import SectionSeperator from "../../Components/SectionSeperator/SectionSeperator";
import MainContentCard from "../../Components/MainContentCard/MainContentCard";
import Footer from "../../Components/Footer/Footer";
import Toggle from "../../Components/Toggle/Toggle";
import Carousel from "../../Components/Carousel/Carousel";

import { Button } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const projectPageMuiStyles = theme => ({
  button: {
    display: "none",
    lineHeight: "30px",
    fontSize: "14px",
    textTransform: "none",
    backgroundColor: "#a68e68",
    padding: "5px 50px",
    letterSpacing: "unset",
    marginLeft: "1px",
    marginRight: "1px",
    marginTop: "20px",
    borderRadius: "40px",
    color: "white",
    boxShadow:
      "0 2px 2px 0 rgba(0, 172, 193, 0.14), 0 3px 1px -2px rgba(0, 172, 193, 0.2), 0 1px 5px 0 rgba(0, 172, 193, 0.12)",
    "&:hover": {
      backgroundColor: "#a68e68"
    }
  }
});

const styles = makeStyles(projectPageMuiStyles);

const ProjectsPage = () => {
  const classes = styles();

  return (
    <div>
      <Header scrollHeight="0.25" highligthedIndex="2"></Header>
      <div className="headerContainer">
        <P5Wrapper
          seed={seed}
          linearBackground={`linear-gradient(to bottom right, #000000a6, #029195)`}
        />
        <SectionSeperator></SectionSeperator>
      </div>
      <MainContentCard>
        <div className="projectsPageTitleContainer">
          <h3 className="projectsPageTitle">Work - Projects</h3>
        </div>
        <div className="champagneMomentsContainer">
          <div className="flexColoumn">
            <img src="/cmLogo.png" className="brandLogo"></img>
            <a
              className="textLinks"
              target="_blank"
              href="https://www.instagram.com/champagne_moments/?hl=da"
            >
              <h3 className="brandTitle">#champagne_moments 🍾</h3>
            </a>
          </div>
          <div className="brandGrid">
            <div className="carouselContainer">
              <Carousel>
                <div>
                  <img className="momentsImageSlider" src="/cm/1.jpg"></img>
                </div>
                <div>
                  <img className="momentsImageSlider" src="/cm/2.jpg"></img>
                </div>
                <div>
                  <img className="momentsImageSlider" src="/cm/3.jpg"></img>
                </div>
                <div>
                  <img className="momentsImageSlider" src="/cm/4.jpg"></img>
                </div>
                <div>
                  <img className="momentsImageSlider" src="/cm/5.jpg"></img>
                </div>
                <div>
                  <img className="momentsImageSlider" src="/cm/6.jpg"></img>
                </div>
              </Carousel>
            </div>
            <div className="momentsDescription">
              <p>
                In 2014 my brother{" "}
                <a
                  className="textLinks"
                  href="https://www.linkedin.com/in/jesper-sandberg/"
                  target="_blank"
                >
                  Jesper Sandberg
                </a>
                , founded Champagne Moments on Instagram, which is now one of
                the largest champagne profiles in the world. In 2016 i got
                involved as co-founder after he approached me with the idea of a
                digital community for champagne.
                <br></br>
                <br></br>
                My involvment in 2016, marked the beginning of my Software
                Career! In the duo i took on the CTO, system architect and
                developer role together with our technical advisor{" "}
                <a
                  className="textLinks"
                  href="https://www.linkedin.com/in/larslb/"
                  target="_blank"
                >
                  Lars Baunwall
                </a>
                . The idea essentialy became to make a luxurios social media for
                champagne lovers, connecting members with stakeholders of the
                industry.
                <br></br>
                <br></br>
                The project was implemented using a handfull of different
                technologies and patterns, amongst some of these were: CQRS,
                Event-Sourcing, Xamarin.Forms, .Net Core 2+, IdentityServer4,
                mongoDB/SQL, Azure Devops and much, much more... The entire
                stack can be seen on{" "}
                <a
                  className="textLinks"
                  href="https://stackshare.io/champagne-moments/champagne-moments"
                  target="_blank"
                >
                  stackshare!
                </a>
              </p>
              <Button
                onClick={() => console.log("clicked")}
                className={classes.button}
              >
                Read More
              </Button>
            </div>
          </div>
        </div>
      </MainContentCard>
      <Footer></Footer>
    </div>
  );
};

export default ProjectsPage;
