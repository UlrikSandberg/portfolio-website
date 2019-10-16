import React from "react";
import { connect } from "react-redux";
import { fetchBlogPosts } from "../../actions";

import Header from "../../Components/Header/Header";
import MainContentCard from "../../Components/MainContentCard/MainContentCard";
import P5Wrapper from "../../Components/P5/P5Wrapper";
import seed from "../../Components/P5/DynamicBG";
import SectionSeperator from "../../Components/SectionSeperator/SectionSeperator";
import ThreeCanvas from "../../Components/Three/ThreeCanvas";
import BlogPostPreviewCard from "../../Components/Cards/BlogPostPreviewCard/BlogPostPreviewCard";
import Footer from "../../Components/Footer/Footer";
import { Redirect } from "react-router-dom";
import style from "./blogPage.css";

class BlogPage extends React.Component {
  onBlogPostClicked = id => {
    this.props.history.push(`/blog-post/${id}`);
  };

  componentDidMount() {
    console.log("Hello");
    this.props.fetchBlogPosts(0, 10);
  }

  renderBlogPosts = () => {
    if (this.props.blogPosts) {
      return (
        <React.Fragment>
          {this.props.blogPosts.map(post => {
            return (
              <div key={post.id} className="blogPostsGridSection">
                <BlogPostPreviewCard
                  title={post.title}
                  description={post.description}
                  timeStamp={post.timeStamp}
                  categories={post.categories}
                  id={post.id}
                  onClick={this.onBlogPostClicked}
                  thumbnail={post.thumbnailImageUrl}
                ></BlogPostPreviewCard>
              </div>
            );
          })}
          {this.props.blogPosts.length === 1 ? (
            <div key="no-id" className="blogPostsGridSection"></div>
          ) : null}
        </React.Fragment>
      );
    }
  };

  render() {
    return (
      <div>
        <Header highligthedIndex="1"></Header>
        <div className="headerContainer">
          <P5Wrapper
            seed={seed}
            linearBackground={`linear-gradient(to bottom right, #000000a6, #029195)`}
          />
          <SectionSeperator></SectionSeperator>
        </div>
        <MainContentCard>
          <div className="blogPageTitleContainer">
            <div className="blogPageTitle">The Blog</div>
          </div>
          <div className="blogPostsGrid">{this.renderBlogPosts()}</div>
        </MainContentCard>
        <Footer></Footer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    blogPosts: state.blogPosts.posts
  };
};

export default connect(
  mapStateToProps,
  { fetchBlogPosts: fetchBlogPosts }
)(BlogPage);
