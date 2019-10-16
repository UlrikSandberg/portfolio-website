import React from "react";
import { connect } from "react-redux";
import { fetchBlogPost } from "../../actions";

import style from "./blogPost.css";

import Header from "../../Components/Header/Header";
import P5Wrapper from "../../Components/P5/P5Wrapper";
import seed from "../../Components/P5/DynamicBG";
import SectionSeperator from "../../Components/SectionSeperator/SectionSeperator";
import MainContentCard from "../../Components/MainContentCard/MainContentCard";
import Footer from "../../Components/Footer/Footer";

class BlogPost extends React.Component {
  componentDidMount() {
    if (!this.props.blogPost) {
      this.props.fetchBlogPost(this.props.match.params.id);
    }
  }

  renderBlogPost = () => {
    if (this.props.blogPost) {
      return (
        <React.Fragment>
          <div className="blogPostHeader">
            <img
              className="imageHeader"
              src={this.props.blogPost.headerImageUrl}
            ></img>
            <div className="imageHeaderOverlay">
              <div className="blogTitle">{this.props.blogPost.title}</div>
            </div>
          </div>
          <MainContentCard>
            <h3 className="infoTitle">Render Specific Post html right here!</h3>
          </MainContentCard>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="blogPostHeader">
            <img className="imageHeader" src="/placeholder.jpg"></img>
            <div className="imageHeaderOverlay">
              <div className="blogTitle">
                "Seems something went wrong... ;("
              </div>
            </div>
          </div>
          <MainContentCard>
            <h3 className="infoTitle">Render Specific Post html right here!</h3>
          </MainContentCard>
        </React.Fragment>
      );
    }
  };

  render() {
    return (
      <div>
        <Header></Header>
        {this.renderBlogPost()}
        <Footer></Footer>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let post = null;

  if (state.blogPosts.posts !== null && state.blogPosts.posts !== undefined) {
    state.blogPosts.posts.forEach(element => {
      if (element.id === ownProps.match.params.id) {
        post = element;
      }
    });
  }
  return {
    blogPost: post
  };
};

export default connect(
  mapStateToProps,
  { fetchBlogPost: fetchBlogPost }
)(BlogPost);
