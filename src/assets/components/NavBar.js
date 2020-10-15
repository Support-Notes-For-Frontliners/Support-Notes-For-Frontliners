import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Hidden from '@material-ui/core/Hidden'
import Slide from '@material-ui/core/Slide';
import { Link, IconButton } from '@material-ui/core';
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
//import { mdiNotebookOutline } from '@mdi/js';
//import Icon from '@mdi/react'
import Drawer from './Drawer.js'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
      flexGrow: 1,
      color: "white",
  },
  links: {
    marginLeft:"25px",
    fontWeight: "300",
  },
  importantLink:{
    background: "#95D4DA",
    borderRadius: "5px",
    padding: "3px 10px",
  },
}
));



function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function NavBar(props) {
const classes = useStyles();

// var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);


  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar color="primary" >
          <Toolbar>
            <IconButton  
            href="/">
              <img alt="logo512" src="/logo512-white.png" width="32" height="32"/>
           </IconButton>
           <Hidden only={['xs', 'sm']}>
            <Typography variant="h5" className={classes.title} noWrap>
                <Link underline="none" component={RouterLink} to="/" style = {{color: "white" , marginLeft: "5px"}}> 
                Notes For Frontliners
                </Link>
            </Typography>
            </Hidden>

            <Hidden only={['sm', 'md', 'lg', 'xl']}>
             <Drawer/>
            </Hidden>
            <Hidden only={['xs']}>
              <Typography className = {`${classes.links} ${classes.importantLink}`}  variant="h6">
                  <Link underline="none" component={RouterLink} to="/note" style = {{color: "white" }}> 
                  Write a Note
                  </Link>
              </Typography>
              <Typography className = {classes.links}  variant="h6">
                  <Link underline="none" component={RouterLink} to="/note-gallery"  style= {{color: "white" }}> 
                  Gallery
                  </Link>
              </Typography>
              <Typography className={classes.links} variant="h6">
                <Link underline="none" href="https://bank.hackclub.com/donations/start/notes-for-frontliners" target="_blank" style={{ color: "white" }}>
                  Donate
                </Link>
              </Typography>
              {/* <Typography className = {classes.links}  variant="h6">
                  <Link underline="none" href="https://blog.notesforfrontliners.org" target="_blank" style= {{color: "white" }}> 
                  Blog
                  </Link>
              </Typography> */}
              <Typography className = {classes.links} variant="h6">
                  <Link underline="none" component={RouterLink} to="/about" style = {{color: "white" }}> 
                  About
                  </Link>
              </Typography>

            </Hidden>
 
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
}