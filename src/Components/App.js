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
import ThreeView from "../views/ThreeView/ThreeView";

var hist = createBrowserHistory();

hist.listen(location => {
  // Use setTimeout to make sure this runs after React Router's own listener
  setTimeout(() => {
    // Keep default behavior of restoring scroll position when user:
    // - clicked back button
    // - clicked on a link that programmatically calls `history.goBack()`
    // - manually changed the URL in the address bar (here we might want
    // to scroll to top, but we can't differentiate it from the others)
    if (hist.action === "POP") {
      return;
    }
    // In all other cases, scroll to top
    window.scrollTo(0, 0);
  });
});

const App = () => {
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/blog-page" component={BlogPage} />
        <Route path="/blog-post/:id" component={BlogPost} />
        <Route path="/projects" component={ProjectsPage} />
        <Route path="/trial" component={ThreeView} />
        <Route path="/" component={ProfilePage} />
      </Switch>
    </Router>
  );
};

export default App;
