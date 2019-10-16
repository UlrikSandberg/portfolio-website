// Framework Essential imports
import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

// Style imports
import globalStyle from "../assets/css/global.css";
import appStyle from "./App.css";

//App pages!
import ProfilePage from "../views/ProfilePage/ProfilePage";
import BlogPage from "../views/BlogPage/BlogPage";
import ProjectsPage from "../views/ProjectsPage/ProjectsPage";
import BlogPost from "../views/BlogPost/BlogPost";

var hist = createBrowserHistory();

const App = () => {
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/blog-page" component={BlogPage} />
        <Route path="/blog-post/:id" component={BlogPost} />
        <Route path="/projects" component={ProjectsPage} />
        <Route path="/" component={ProfilePage} />
      </Switch>
    </Router>
  );
};

export default App;
