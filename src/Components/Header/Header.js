import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  IconButton,
  SwipeableDrawer,
  List,
  ListItem
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ArtTrack, Dashboard, Subject, Close } from "@material-ui/icons";
import style from "./header.css";
import { defaultFont } from "../../assets/jss/resources";

const appBarMuiStyles = theme => ({
  title: {
    ...defaultFont,
    lineHeight: "30px",
    fontSize: "18px",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    padding: "8px 16px",
    letterSpacing: "unset",
    "&:hover,&:focus": {
      color: "inherit",
      background: "transparent"
    }
  },
  iconButton: {
    ...defaultFont,
    lineHeight: "30px",
    fontSize: "14px",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    padding: "8px 16px",
    letterSpacing: "unset",
    marginLeft: "1px",
    marginRight: "1px"
  },
  blogIcon: {
    marginRight: "6px",
    color: "inherit",
    fontSize: "2.3em"
  },
  projectsIcon: {
    marginRight: "6px",
    color: "inherit"
  },
  socialIcons: {
    marginRight: "7px",
    color: "inherit",
    fontSize: "1.5em"
  },
  drawerPaper: {
    border: "none",
    bottom: "0",
    transitionProperty: "top, bottom, width",
    transitionDuration: ".2s, .2s, .35s",
    transitionTimingFunction: "linear, linear, ease",
    width: "260px",
    position: "fixed",
    display: "block",
    top: "0",
    height: "100vh",
    right: "0",
    left: "auto",
    visibility: "visible",
    overflowY: "visible",
    borderTop: "none",
    textAlign: "left",
    paddingRight: "0px",
    paddingLeft: "0",
    boxShadow:
      "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
  },
  list: {
    ...defaultFont,
    fontSize: "14px",
    margin: 0,
    paddingLeft: "0",
    listStyle: "none",
    paddingTop: "20px",
    paddingBottom: "0",
    color: "inherit"
  },
  listItem: {
    float: "left",
    color: "inherit",
    position: "relative",
    display: "block",
    margin: "0",
    padding: "0",
    width: "100%",
    "&:after": {
      width: "calc(100% - 40px)",
      content: '""',
      display: "block",
      height: "1px",
      marginLeft: "15px",
      backgroundColor: "#e5e5e5"
    }
  },
  drawerCloseIcon: {
    float: "right",
    marginTop: "15px",
    marginRight: "15px",
    marginBottom: "5px"
  },
  drawerIconButton: {
    ...defaultFont,
    lineHeight: "30px",
    fontSize: "14px",
    borderRadius: "3px",
    textTransform: "none",
    color: "#555",
    padding: "8px 16px",
    letterSpacing: "unset",
    marginLeft: "20px",
    marginTop: "8px",
    marginBottom: "8px",
    marginRight: "20px",
    paddingRight: "auto",
    float: "left",
    width: "calc(100% - 40px)",
    justifyContent: "left",
    "&:hover": {
      backgroundColor: "#00acc4",
      boxShadow:
        "0 2px 2px 0 rgba(0, 172, 193, 0.14), 0 3px 1px -2px rgba(0, 172, 193, 0.2), 0 1px 5px 0 rgba(0, 172, 193, 0.12)",
      color: "white",
      "& svg": {
        color: "white"
      },
      "& i": {
        color: "white"
      }
    }
  },
  highlighthedIcon: {
    backgroundColor: "#00acc4!important",
    boxShadow:
      "0 2px 2px 0 rgba(0, 172, 193, 0.14), 0 3px 1px -2px rgba(0, 172, 193, 0.2), 0 1px 5px 0 rgba(0, 172, 193, 0.12)",
    color: "white",
    "& svg": {
      color: "white"
    },
    "& i": {
      color: "white"
    }
  },
  link: {
    textDecoration: "none",
    backgroundColor: "inherit",
    color: "inherit"
  }
});

const useStyles = makeStyles(appBarMuiStyles);
const Header = props => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", validateOpenDrawer);

    return function cleanup() {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", validateOpenDrawer);
    };
  });

  const validateOpenDrawer = () => {
    if (drawerOpen && window.innerWidth > 970) {
      setDrawerOpen(false);
    }
  };

  const handleScroll = () => {
    const pageYOffset = window.pageYOffset;

    if (pageYOffset > 300) {
      //Add Appbar scroll appearance
      document.body
        .getElementsByClassName("appBar")[0]
        .classList.remove("appBarTop");
      document.body
        .getElementsByClassName("appBar")[0]
        .classList.add("appBarScrolled");
    } else {
      document.body
        .getElementsByClassName("appBar")[0]
        .classList.add("appBarTop");
      document.body
        .getElementsByClassName("appBar")[0]
        .classList.remove("appBarScrolled");
    }
  };

  const renderNavButtons = (index, isDrawer) => {
    if (isDrawer) {
      switch (index) {
        case 1:
          return props.highligthedIndex == 1 ? (
            <Button
              className={`${classes.drawerIconButton} ${classes.highlighthedIcon}`}
            >
              <ArtTrack className={classes.blogIcon} fontSize="inherit" />
              Blog
            </Button>
          ) : (
            <Button className={classes.drawerIconButton}>
              <ArtTrack className={classes.blogIcon} fontSize="inherit" />
              Blog
            </Button>
          );
        case 2:
          return props.highligthedIndex == 2 ? (
            <Button
              className={`${classes.drawerIconButton} ${classes.highlighthedIcon}`}
            >
              <Dashboard className={classes.projectsIcon} fontSize="default" />
              Projects
            </Button>
          ) : (
            <Button className={classes.drawerIconButton}>
              <Dashboard className={classes.projectsIcon} fontSize="default" />
              Projects
            </Button>
          );
        default:
          return;
      }
    } else {
      switch (index) {
        case 1:
          return props.highligthedIndex == 1 ? (
            <Button
              className={`${classes.iconButton} ${classes.highlighthedIcon} appBarIconId navBtn`}
            >
              <ArtTrack className={classes.blogIcon} fontSize="inherit" />
              Blog
            </Button>
          ) : (
            <Button className={`${classes.iconButton} appBarIconId navBtn`}>
              <ArtTrack className={classes.blogIcon} fontSize="inherit" />
              Blog
            </Button>
          );
        case 2:
          return props.highligthedIndex == 2 ? (
            <Button
              className={`${classes.iconButton} ${classes.highlighthedIcon} appBarIconId navBtn`}
            >
              <Dashboard className={classes.projectsIcon} fontSize="default" />
              Projects
            </Button>
          ) : (
            <Button className={`${classes.iconButton} appBarIconId navBtn`}>
              <Dashboard className={classes.projectsIcon} fontSize="default" />
              Projects
            </Button>
          );

        default:
          return;
      }
    }
  };

  const rendeDrawerSideList = () => (
    <div>
      <IconButton
        onClick={handleDrawerToggle}
        className={classes.drawerCloseIcon}
      >
        <Close></Close>
      </IconButton>
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <Link className={classes.link} to="/blog-page">
            {renderNavButtons(1, true)}
          </Link>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Link className={classes.link} to="/projects">
            {renderNavButtons(2, true)}
          </Link>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            className={classes.drawerIconButton}
            href="https://github.com/UlrikSandberg?tab=repositories"
            target="_blank"
          >
            <i className={`${classes.socialIcons} fab fa-github`} />
            GitHub
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            className={classes.drawerIconButton}
            href="https://www.linkedin.com/in/ulrik-sandberg-b2a566143/"
            target="_blank"
          >
            <i className={`${classes.socialIcons} fab fa-linkedin`} />
            LinkedIn
          </Button>
        </ListItem>
      </List>
    </div>
  );

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const classes = useStyles();
  return (
    <header className="appBar appBarTop">
      <div className="appBarContext">
        <Link className={classes.link} to="/">
          <Button className={`${classes.title}`}>#UlrikSandberg</Button>
        </Link>
        <div>
          <div className="burgerMenu">
            <IconButton onClick={handleDrawerToggle}>
              <Subject></Subject>
            </IconButton>
          </div>
          <ul className="appBarMenu">
            <Link className={classes.link} to="/blog-page">
              {renderNavButtons(1, false)}
            </Link>
            <Link className={classes.link} to="/projects">
              {renderNavButtons(2, false)}
            </Link>
            <Button
              className={`${classes.iconButton} appBarIconId socialIcon`}
              href="https://github.com/UlrikSandberg?tab=repositories"
              target="_blank"
            >
              <i className={`${classes.socialIcons} fab fa-github`} />
              GitHub
            </Button>
            <Button
              className={`${classes.iconButton} appBarIconId socialIcon`}
              href="https://www.linkedin.com/in/ulrik-sandberg-b2a566143/"
              target="_blank"
            >
              <i className={`${classes.socialIcons} fab fa-linkedin`} />
              LinkedIn
            </Button>
          </ul>
        </div>
        <SwipeableDrawer
          anchor="right"
          open={drawerOpen}
          onOpen={() => console.log("drawer is opening")}
          onClose={handleDrawerToggle}
          classes={{ paper: classes.drawerPaper }}
        >
          {rendeDrawerSideList()}
        </SwipeableDrawer>
      </div>
    </header>
  );
};

export default Header;
