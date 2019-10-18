import React from "react";
import { Link } from "react-router-dom";

import style from "./footer.css";

import ContributionFooter from "./ContributionFooter";

const Footer = () => {
  return (
    <div>
      <div className="footerContainer">
        <div className="footerContext">
          <div className="footerQuickLinks">
            <div>
              <Link to="/">#UlrikSandberg</Link>
            </div>
            <div>
              <Link to="/blog-page">Blog</Link>
            </div>
            <div>
              <Link to="/projects">Projects</Link>
            </div>
            <div>
              <a
                href="https://github.com/UlrikSandberg?tab=repositories"
                target="_blank"
              >
                GitHub
              </a>
            </div>
            <div>
              <a
                href="https://www.linkedin.com/in/ulrik-sandberg-b2a566143/"
                target="_blank"
              >
                LinkedIn
              </a>
            </div>
            <div>
              <a
                target="_blank"
                href="mailto:ujsandberg@gmail.com"
                rel="noopener"
              >
                ujsandberg@gmail.com
              </a>
            </div>
          </div>
          <div className="copyrightTitle">
            <div>
              {"\u00A9"} 2019 - Made by Ulrik Sandberg{" "}
              <ContributionFooter></ContributionFooter>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
