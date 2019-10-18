import React from "react";
import { connect } from "react-redux";
import { fetchBlogPost } from "../../actions";

import style from "./blogPost.css";

import Header from "../../Components/Header/Header";
import MainContentCard from "../../Components/MainContentCard/MainContentCard";
import Footer from "../../Components/Footer/Footer";

class BlogPost extends React.Component {
  state = { blogPostHtml: "", isLoading: false };

  constructor(props) {
    super(props);
    this.frameRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("resize", this.resizeFrame);
    if (!this.props.blogPost) {
      this.props.fetchBlogPost(this.props.match.params.id);
    }
    this.setState({ isLoading: true });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFrame);
  }

  resizeFrame = () => {
    this.frameRef.current.style.height = `${this.frameRef.current.contentWindow.document.body.scrollHeight}px`;
  };

  isLoading = () => {
    if (this.props.blogPost) {
      this.fetchPostContent(this.props.blogPost.blogContentUrl);
    }
    if (this.props.blogPost === null) {
      this.setState({ isLoading: false });
    }
    return <div>Loading!!!</div>;
  };

  fetchPostContent = postContentUrl => {
    fetch(postContentUrl)
      .then(res => {
        return res.text();
      })
      .then(data => {
        this.setState({ blogPostHtml: data, isLoading: false });
      });
  };

  renderHeaderContent = () => {
    console.log(this.props);
    if (this.props.blogPost) {
      return (
        <React.Fragment>
          <img
            className="imageHeader"
            src={this.props.blogPost.headerImageUrl}
            alt="header"
          ></img>
          <div className="imageHeaderOverlay">
            <div className="blogTitle">{this.props.blogPost.title}</div>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <img className="imageHeader" src="" alt="header"></img>
          <div className="imageHeaderOverlay">
            <div className="blogTitle">"Seems something went wrong... ;("</div>
          </div>
        </React.Fragment>
      );
    }
  };

  render() {
    if (this.state.isLoading) {
      return <div>{this.isLoading()}</div>;
    } else {
      return (
        <div>
          <Header scrollHeight="0.25"></Header>
          <div className="blogPostHeader">{this.renderHeaderContent()}</div>
          <MainContentCard>
            <iframe
              frameBorder="0"
              scrolling="no"
              srcDoc={this.state.blogPostHtml}
              onChange={() => console.log("Loaded content1")}
              className="blogIframe"
              onLoad={() => this.resizeFrame()}
              title="unique"
              ref={this.frameRef}
            ></iframe>
          </MainContentCard>
          <Footer></Footer>
        </div>
      );
    }
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
